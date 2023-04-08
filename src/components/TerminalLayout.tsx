import { ReactNode } from 'react';
import CoreTerminal from './core/CoreTerminal';
import CoreNavigation from './core/CoreNavigation';
import { Card, Tooltip } from '@nextui-org/react';
import styles from './TerminalLayout.module.css';
import { Icon } from '@iconify/react';
import { BaseInfo } from '~/interface/query';

const TerminalLayout = ({
  children,
  baseInfo,
}: {
  children: ReactNode;
  baseInfo: BaseInfo;
}) => {
  const CustomTooltip = ({
    children,
    content,
  }: {
    children: ReactNode;
    content: ReactNode | string;
  }) => {
    return (
      <>
        <Tooltip
          content={content}
          trigger="hover"
          hideArrow={true}
          css={{
            background: '$myBlack',
            borderRadius: '$xs',
            whiteSpace: 'break-spaces',
          }}
          color="secondary"
        >
          {children}
        </Tooltip>
      </>
    );
  };

  const Master = ({ className }: { className?: string }) => {
    return (
      <>
        <div className={`${styles.barItem} ${className} flex items-center`}>
          <Icon icon="mdi:source-branch"> </Icon>
          <span>master</span>
        </div>
      </>
    );
  };

  // 从环境变量中获取打包时间
  const buildTime = process.env.BUILD_TIME ?? 'n/a';
  return (
    <>
      <div className="flex items-stretch justify-center flex-auto w-full lg:items-center h-[100vh]">
        <div className="flex h-full w-full shrink grow-0 basis-auto flex-col items-stretch pt-[15px] md:items-center lg:max-h-[28rem] lg:max-w-3xl">
          <CoreNavigation />
          <CoreTerminal
            path="~"
            prefix="aiisx"
            value="Hello!"
            githubuser={baseInfo.githubUser.name}
          />
          <Card
            className="flex flex-auto w-full h-full p-0 rounded-[4px] border-none"
            css={{ padding: 0, display: 'flex', flexDirection: 'column' }}
            isHoverable={true}
          >
            {children}
            <Card.Footer
              className={
                styles.bottomBar +
                ' rounded-[4px] rounded-tr-[0] rounded-tl-[0] border-[1px] border-[#ffffff17] p-0'
              }
            >
              <span className="flex flex-auto">
                <CustomTooltip
                  content={`client  build date: ${buildTime}
server build date: ${baseInfo.version.date}`}
                >
                  <Icon
                    fontSize={28}
                    icon="logos:visual-studio-code"
                    className={styles.barItem}
                  ></Icon>
                </CustomTooltip>

                <CustomTooltip
                  content={
                    <Master className="hover:!bg-[#48484e] !cursor-default" />
                  }
                >
                  {<Master />}
                </CustomTooltip>
              </span>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TerminalLayout;
