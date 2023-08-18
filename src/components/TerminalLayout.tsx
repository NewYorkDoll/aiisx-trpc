import { ReactNode } from 'react';
import CoreTerminal from './core/CoreTerminal';
import CoreNavigation from './core/CoreNavigation';
import { Card, Tooltip } from '@nextui-org/react';
import styles from './TerminalLayout.module.css';
import { Icon } from '@iconify/react';
import { BaseInfo } from '~/interface/query';
import { version } from 'react';
const TerminalLayout = ({
  children,
  baseInfo,
  countSlot,
}: {
  children: ReactNode;
  countSlot: ReactNode;
  baseInfo: BaseInfo;
}) => {
  const CustomTooltip = ({
    children,
    content,
    className,
  }: {
    children: ReactNode;
    content: ReactNode | string;
    className?: string;
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
            fontSize: '14px',
          }}
          portalClassName={className}
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

  const GithubInfoBox = () => {
    return (
      <>
        <p className="flex items-center">
          <Icon icon="mdi:github" className="align-middle mr-[7px]"></Icon>
          {baseInfo.githubUser.bio} &middot;
          {baseInfo.githubUser.name}
        </p>
      </>
    );
  };

  interface LanguageBucket {
    language: string;
    total: number;
    percentage?: number;
    titleLength?: number;
  }

  const codingStats = (function () {
    const out: LanguageBucket[] = [];
    let maxTitleLength = 5;
    for (const stat of baseInfo.codingStats.languages) {
      if (out[5]) {
        out[5].language = 'Other';
        out[5].total += stat.total;
        continue;
      }
      maxTitleLength = Math.max(maxTitleLength, stat.language.length);
      out.push(stat);
    }

    for (const stat of out) {
      stat.titleLength = maxTitleLength;
      stat.percentage = Math.round(
        (stat.total / baseInfo.codingStats.TotalSeconds) * 100,
      );
    }
    return out;
  })();

  const HistoryBox = () => {
    return (
      <>
        <p className="text-violet-400">
          last {baseInfo.codingStats.calculatedDays} day coding stats
        </p>
        {codingStats.map((stat) => (
          <div
            className="flex flex-row items-center flex-auto"
            key={stat.language}
          >
            <Tooltip content={stat.language}>
              <div
                className="text-right shrink-0 mr-[1ch] max-w-[10ch] truncate"
                style={{ width: stat.titleLength + 'ch' }}
              >
                {stat.language}
              </div>
            </Tooltip>
            <div className="w-full rounded bg-zinc-900">
              <div
                className="h-2 rounded bg-gradient-to-r from-fuchsia-600 to-pink-600"
                style={{ width: stat.percentage + '%' }}
              />
            </div>
            <div className="shrink-0 ml-[1ch] w-[3ch]">{stat.percentage}%</div>
          </div>
        ))}
      </>
    );
  };

  const menuOptions = [
    { to: '/', name: 'Home', alias: 'main' },
    { to: '/game-are-life', name: 'No Game No Life', alias: 'game' },
    { to: '/posts', name: 'Posts', alias: 'posts' },
    { to: '/repost', name: 'repost', alias: 'repost' },
    {
      to: `/about?to=${baseInfo.githubUser.htmlurl}`,
      name: 'About',
      alias: 'github',
    },
    { to: '/contact', name: 'Contact', alias: 'sudo' },
  ];

  return (
    <>
      <div className="flex items-stretch justify-center flex-auto w-full lg:items-center h-[100vh]">
        <div className="flex h-full w-full shrink grow-0 basis-auto flex-col items-stretch pt-[15px] md:items-center lg:max-h-[28rem] lg:max-w-3xl">
          <CoreNavigation menuOptions={menuOptions} />
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
              <span className="flex flex-auto text-[14px]">
                <CustomTooltip
                  content={`commit message: ${baseInfo.version.commit.slice(
                    0,
                    24,
                  )}...
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
                    <Master className="hover:!bg-[#48484e] !cursor-default !text-white" />
                  }
                >
                  {<Master />}
                </CustomTooltip>
                <span className={styles.barItem}>
                  <Icon
                    icon="logos:nodejs-icon"
                    className="mr-1 align-middle"
                  ></Icon>
                  {baseInfo.version.goVersion.replace('go', '')}
                </span>
                <span className={styles.barItem}>
                  <Icon icon="logos:react" className="mr-1 align-middle"></Icon>
                  {version}
                </span>
                <CustomTooltip
                  content={HistoryBox()}
                  className="px-2 py-1 rounded border border-solid border-zinc-700 shadow-none !m-0 w-[240px]"
                >
                  <span className={styles.barItem}>
                    <Icon
                      fontSize={28}
                      icon="mdi:history"
                      className={`${styles.barItem} !text-violet-400`}
                    />
                    {baseInfo.codingStats.totalDuration}
                  </span>
                </CustomTooltip>
                <span className="ml-auto"></span>
                {countSlot && (
                  <span className={`${styles.barItem} ${styles.misc}`}>
                    {countSlot}
                  </span>
                )}
                <CustomTooltip content="... or just gofmt">
                  <span className={`${styles.barItem} ${styles.misc}`}>
                    spaces:4
                  </span>
                </CustomTooltip>
                <CustomTooltip content={GithubInfoBox()}>
                  <a
                    className="flex px-2 transition bg-blue-600 rounded-br-sm hover:bg-blue-800 hover:text-current"
                    style={{ color: 'white !important' }}
                    href={baseInfo.githubUser.htmlurl}
                  >
                    <Icon
                      icon="mdi:github"
                      className="align-middle mr-[7px]"
                    ></Icon>

                    {baseInfo.githubUser.login}
                  </a>
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
