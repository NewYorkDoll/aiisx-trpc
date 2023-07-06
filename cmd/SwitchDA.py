import json
import time
from datetime import datetime,timedelta
import pandas as pd 
from sqlalchemy import create_engine,types
import pymysql
from dotenv import load_dotenv
from requests_html import HTMLSession
from SwitchWebAPI import *
from bs4 import BeautifulSoup
load_dotenv()
session = HTMLSession()


client_id = os.getenv("SWITCH_CLIENT_ID") # 你生成session_token时使用的client_id
ua = 'com.nintendo.znej/1.13.0 (Android/7.1.2)'
session_token=os.getenv("SWITCH_SESSION_TOKEN") #你的session_token
db_user=os.getenv("DB_USER") # 用于连接数据库的用户名
db_passwd=os.getenv("DB_PASSWD") # 用于连接数据库的用户密码
db_dbname=os.getenv("DB_DBNAME") # 数据库中待连接的库名
db_hostname=os.getenv("DB_HOST") # 数据库主机地址
db_port=os.getenv("DB_PORT") # 数据库端口

# 通过ec.nintendo.com/HK/zh/titles/获取游戏中文信息
def NS_GetGameZhInfo(title_id,ua,name,cover):
    url="https://ec.nintendo.com/apps/"+title_id+"/HK"
    headers={
        "User-Agent":ua,
        "Origin":"https://ec.nintendo.com",
        "Connection":"keep-alive",
        "Pragma":"no-cache",
        "Cache-Control":"no-cache"
    }
    r=session.get(url,headers=headers)
    r.html.render(sleep=0.5,script="""
    () => {
         setTimeout(function(){
            const el = document.querySelector('.o_p-product-filter-background')
            if(el){
                document.querySelector('.o_c-button-fill').click()
                }}
            , 200);
        }
    """)
    soup=BeautifulSoup(r.html.html,"html.parser")
    zh_name=name
    zh_cover=cover
    try:

        # 中文名在.o_c-page-title的div下的h1标签里
        zh_name=soup.select(".o_c-page-title h1")[0].text
        # .o_c-hero-bg__image-inner的div下的img标签的src属性
        zh_cover=soup.select(".o_c-hero-bg__image-inner img")[0].attrs["src"]
    except IndexError:
        print("暂无中文信息", zh_name)
    # 
    return zh_name,zh_cover

def SwitchDA_GamePlayHistory(client_id,session_token,ua):
    results=NS_GetPlayHistory(NS_GetAccessToken(client_id,session_token),ua)

    titleId=[]
    titleName=[]
    deviceType=[]
    imageUrl=[]
    lastUpdatedAt=[]
    firstPlayedAt=[]
    lastPlayedAt=[]
    totalPlayedDays=[]
    totalPlayedMinutes=[]
    zh_name=[]
    zh_cover=[]
    for i in results["playHistories"]:
        titleId.append(i["titleId"])
        titleName.append(i["titleName"])
        deviceType.append(i["deviceType"])
        imageUrl.append(i["imageUrl"])
        lastUpdatedAt.append(i["lastUpdatedAt"])
        firstPlayedAt.append(i["firstPlayedAt"])
        lastPlayedAt.append(i["lastPlayedAt"])
        totalPlayedDays.append(i["totalPlayedDays"])
        totalPlayedMinutes.append(i["totalPlayedMinutes"])
        gameZhInfo = NS_GetGameZhInfo(i["titleId"],ua,i['titleName'],i['imageUrl'])
        zh_name.append(gameZhInfo[0])
        zh_cover.append(gameZhInfo[1])
    df=pd.DataFrame({"titleId":titleId,"titleName":titleName,"deviceType":deviceType,"imageUrl":imageUrl,"lastUpdatedAt":lastUpdatedAt,"firstPlayedAt":firstPlayedAt,"lastPlayedAt":lastPlayedAt,"totalPlayedDays":totalPlayedDays,"totalPlayedMinutes":totalPlayedMinutes})

    zh_df=pd.DataFrame({"title_id":titleId,"zh_name":zh_name,"zh_cover":zh_cover})


    UTC9to8=lambda x: (datetime.strptime(x,"%Y-%m-%dT%H:%M:%S+09:00")-timedelta(hours=1)).strftime("%Y-%m-%d %H:%M:%S")

    df["lastUpdatedAt"]=df["lastUpdatedAt"].map(UTC9to8)
    df["firstPlayedAt"]=df["firstPlayedAt"].map(UTC9to8)
    df["lastPlayedAt"]=df["lastPlayedAt"].map(UTC9to8)

    # print(df)

    con_engine = create_engine('mysql+pymysql://'+db_user+':'+db_passwd+'@'+db_hostname+':'+db_port+'/'+db_dbname+'?charset=utf8')

    dtype={"titleId":types.String(length=255,collation='utf8mb4_unicode_ci'),
            "titleName":types.String(length=255,collation='utf8mb4_unicode_ci'),
            "deviceType":types.String(length=255,collation='utf8mb4_unicode_ci'),
            "imageUrl":types.String(length=255,collation='utf8mb4_unicode_ci'),
            "lastUpdatedAt":types.DateTime(),
            "firstPlayedAt":types.DateTime(),
            "lastPlayedAt":types.DateTime(),
            "totalPlayedDays":types.Integer(),
            "totalPlayedMinutes":types.Integer()
    }

    df.to_sql('dim_switch_game_play_history', con_engine, dtype=dtype, if_exists='replace', index = False)

    dtype={"title_id":types.String(length=255,collation='utf8mb4_unicode_ci'),
            "zh_name":types.String(length=255,collation='utf8mb4_unicode_ci'),
            "zh_cover":types.String(length=255,collation='utf8mb4_unicode_ci')
    }

    zh_df.to_sql('dim_switch_game_name_translate_man', con_engine, dtype=dtype, if_exists='replace', index = False)

def SwitchDA_GamePlayedRecord():

    db = pymysql.connect(
        host=db_hostname, 
        port=int(db_port),
        user=db_user,    #在这里输入用户名
        password=db_passwd,     #在这里输入密码
        charset='utf8mb4',
        database=db_dbname    #指定操作的数据库
        )

    cursor = db.cursor() #创建游标对象

    try:
        sql="""
        INSERT INTO dwd_switch_game_played_record 
        SELECT 
                NULL id,
                t1.titleId ,
                t1.titleName ,
                NULL zh_name,
                NULL zh_cover,
                t1.lastPlayedAt,
                COALESCE(t1.totalPlayedMinutes  - t2.play_time,t1.totalPlayedMinutes) play_time,
                NOW() create_time,
                NOW() update_time 
        FROM (
        SELECT 
                    titleId ,
                    titleName ,
                    lastPlayedAt ,
                    totalPlayedMinutes
        FROM dim_switch_game_play_history
        ) t1
        LEFT JOIN
        (
        SELECT 
                    title_id ,
                    SUM(play_time) play_time,
                    MAX(last_played_at) last_played_at
        FROM dwd_switch_game_played_record
        GROUP BY title_id
        )t2
        ON t1.titleId=t2.title_id COLLATE utf8mb4_unicode_ci
        WHERE t2.last_played_at IS NULL OR t1.lastPlayedAt !=t2.last_played_at COLLATE utf8mb4_unicode_ci;
        """
        # print(sql)
        cursor.execute(sql)
        db.commit()
        cursor.execute("""
            UPDATE dwd_switch_game_played_record AS r
                JOIN dim_switch_game_name_translate_man AS t ON r.title_id = t.title_id
            SET r.zh_name = t.zh_name, r.zh_cover = t.zh_cover;
        """)
        db.commit()

    except Exception as e:
        print(e)
        db.rollback()  #回滚事务

    finally:
        cursor.close() 
        db.close()  #关闭数据库连接


if __name__ == "__main__":

    bt=time.time()
    print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"),"开始采集Switch游戏数据")

    SwitchDA_GamePlayHistory(client_id,session_token,ua)
    SwitchDA_GamePlayedRecord()

    print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"),"Switch游戏数据采集结束",time.time()-bt)