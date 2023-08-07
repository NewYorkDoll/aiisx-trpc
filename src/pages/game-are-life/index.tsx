/* eslint-disable @typescript-eslint/no-non-null-assertion */
import CoreNavigation from '~/components/core/CoreNavigation';
import styles from './index.module.css';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { InferGetServerSidePropsType } from 'next';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
import CoreTerminal from '~/components/core/CoreTerminal';
require('dayjs/locale/zh-cn');
dayjs.extend(utc);
dayjs.extend(timezone);

export async function getServerSideProps() {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });
  const switchGameList = await ssg.game.getSwitchGameList.fetch();
  // Pass data to the page via props
  return {
    props: {
      switchGameList: switchGameList.map((item) => {
        return {
          ...item,
          last_played_at: dayjs(item.last_played_at)
            .tz('Africa/Casablanca')
            .locale('zh-cn')
            .format('YYYY-MM-DD HH:mm A'),
          create_time: dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss'),
          update_time: dayjs(item.update_time).format('YYYY-MM-DD HH:mm:ss'),
        };
      }),
    },
  };
}

const GameAreLife = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  // 获取时间戳（毫秒级别）
  const getTime = useCallback(() => {
    return new Date().getTime();
  }, []);

  const { current } = useRef<{
    scrollTime: number | null;
    isScroll: boolean;
    timer: NodeJS.Timeout | undefined;
    interval: number;
    distance: number;
    delay: number;
  }>({
    isScroll: true, // 是否可以正常的滚动
    scrollTime: null, // 上次切换的时间戳（毫秒级别）
    timer: undefined, // setTimeout句柄
    interval: 500, // 两次滑动之间的最小事件间隔
    distance: 100, // 有效滑动的最小距离
    delay: 400, // 防抖时间
  });

  // wheel事件处理函数
  const wheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    box.current?.scrollTo({
      left: box.current?.scrollLeft + event.deltaY * 3,
      behavior: 'smooth',
    });
  }, []);

  // wheel事件回调
  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();

    const time = getTime();
    const y = e.deltaY; // 以垂直滚动为列

    if (current.scrollTime) {
      // 如果这次触发的时机跟上次切换的时机差大于一定时间，并且滑动距离大于一定距离，那么就认为是有效滑动
      if (
        time - current.scrollTime > current.interval &&
        Math.abs(y) >= current.distance
      ) {
        // 触摸板滚动
        wheel(e);
        clearTimeout(current.timer);
        current.isScroll = false;
        current.scrollTime = time;
      }
    }
    if (current.isScroll) {
      // 正常滚动
      wheel(e);
      current.scrollTime = getTime();
      current.isScroll = false;
    }
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.isScroll = true;
    }, current.delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const baseInfo = {
    githubUser: {
      name: 'yiziluoying',
    },
  };

  const menuOptions = [
    { to: '/', name: 'Home', alias: 'main' },
    { to: '/game-are-life', name: 'No Game No Life', alias: 'game' },
    { to: '/posts', name: 'Posts', alias: 'posts' },
    { to: '/repost', name: 'repost', alias: 'repost' },
    { to: '/contact', name: 'Contact', alias: 'sudo' },
  ];
  const switchGameList = props.switchGameList;

  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowCard(true);
    }, 1600);
  });

  useEffect(() => {
    document.addEventListener('wheel', onWheel, { passive: false });

    return function () {
      document.removeEventListener('wheel', onWheel);
    };
  }, [onWheel]);

  const box = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="flex flex-col text-[32px] h-screen items-center pt-[20vh]">
        <CoreNavigation menuOptions={menuOptions} />
        <div>
          <CoreTerminal
            path="~"
            prefix="aiisx"
            value="No Game No Life!"
            githubuser={baseInfo.githubUser.name}
          />
        </div>

        <div className={styles.switch}>
          <div className={styles.body}>
            <div className={styles.volume} />
            <div className={`${styles.screen} z-10`}>
              {!showCard && (
                <div className={styles.logo}>
                  <div className={styles.icon}>
                    <div className={`${styles.iconPart} ${styles.left}`} />
                    <div className={`${styles.iconPart} ${styles.right}`} />
                  </div>
                  <h1>
                    <span>Nintendo</span>Switch
                  </h1>
                </div>
              )}

              {showCard && switchGameList && (
                <div
                  className="snap-x flex w-full overflow-hidden select-none pr-2 touch-none"
                  ref={box}
                >
                  {switchGameList.map((i) => {
                    return (
                      <div className="snap-center" key={i.id}>
                        <div className="max-w-sm rounded overflow-hidden shadow-lg w-[204px] m-2">
                          <img
                            className="w-full h-[128px] rounded-lg"
                            draggable={false}
                            src={i.zh_cover!}
                            alt={i.zh_name!}
                          />
                          <div className="px-6 py-4">
                            <div className="font-bold text-sm mb-2 truncate">
                              {i.zh_name}
                            </div>
                            <p className="text-xs">
                              最后游玩时间:
                              <br />
                              <span className=" block w-full text-blue-400 ">
                                {i.last_played_at}
                              </span>
                            </p>
                            <p className="text-xs">
                              游玩时长:
                              <br />
                              <span className=" block w-full text-blue-300">
                                {(i.play_time / 60).toFixed(2)} 小时
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className={`${styles.joyCon} ${styles.left}`}>
            <div className={styles.buttonGroup}>
              <div
                className={`${styles.button} ${styles.arrow} ${styles.up}`}
              />
              <div
                className={`${styles.button} ${styles.arrow} ${styles.right}`}
                onClick={() => {
                  box.current?.scrollTo({
                    left: box.current?.scrollLeft + 300,
                    behavior: 'smooth',
                  });
                }}
              />
              <div
                className={`${styles.button} ${styles.arrow} ${styles.down}`}
              />
              <div
                className={`${styles.button} ${styles.arrow} ${styles.left}`}
                onClick={() => {
                  box.current?.scrollTo({
                    left: box.current?.scrollLeft - 300,
                    behavior: 'smooth',
                  });
                }}
              />
            </div>
            <div className={styles.stick} />
            <div className={styles.select} />
            <div className={styles.capture} />
            <div className={`${styles.shoulder} ${styles.l}`} />
          </div>
          <div className={`${styles.joyCon} ${styles.right}`}>
            <div className={styles.buttonGroup}>
              <div
                className={`${styles.button} ${styles.letter}`}
                data-letter="X"
              />
              <div
                className={`${styles.button} ${styles.letter}`}
                data-letter="A"
              />
              <div
                className={`${styles.button} ${styles.letter}`}
                data-letter="B"
              />
              <div
                className={`${styles.button} ${styles.letter}`}
                data-letter="Y"
              />
            </div>
            <div className={styles.stick} />
            <div className={styles.start} />
            <div className={styles.home} />
            <div className={`${styles.shoulder} ${styles.r}`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameAreLife;
