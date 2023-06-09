import { trpc } from '~/utils/trpc';
import { useEffect, useRef, useState } from 'react';
import { useInViewport, useUpdateEffect } from 'ahooks';
import { Avatar, Loading, Tooltip } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import TimeAgo from 'timeago-react';
import styles from './render.module.css';
import EventItemPush from './items/push';
import EventItemWatch from './items/watch';
import EventItemPullRequest from './items/pull-request';
import EventItemCreate from './items/create';
import EventItemFork from './items/fork';
import EventItemIssues from './items/issues';
import EventItemIssueComment from './items/issue-comment';
const EventRender = ({
  stateChange,
}: {
  stateChange: (state: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inViewport] = useInViewport(ref);
  const [hasNextPage, setHasNextPage] = useState(true);
  useUpdateEffect(() => {
    if (inViewport && !query.isFetching && query.data) {
      setHasNextPage(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        query.data.pages[query.data.pages.length - 1]!.hasNextPage,
      );
      if (!hasNextPage) return;
      query.fetchNextPage();
    }
  }, [inViewport]);
  const [cursor] = useState<number | null>(1);
  const params = {
    count: 15,
    cursor: cursor,
  };

  const query = trpc.event.getEventList.useInfiniteQuery(params, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  // 计算列表总数
  const total =
    query.data?.pages.reduce((acc, page) => {
      return acc + page.items.length;
    }, 0) || 0;

  useEffect(() => {
    stateChange(total);
  }, [stateChange, total]);

  return (
    <div className="h-full overflow-y-scroll overflow-x-hidden text-[0.9em] grow basis-0">
      {query.isFetched &&
        query.data?.pages.map((page, i) => (
          <div key={i}>
            {page.items.map((d, i2) => (
              <div
                key={d.event_id}
                style={{
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  '--i': total - (i2 + i * 15),
                  '--total': total,
                }}
                className="flex py-[2px] border-none flex-auto flex-row items-center gap-x-1 px-1 hover:bg-zinc-500/10 text-zinc-400 transition duration-75 ease-out border-b-[1px] !border-b-gray-100"
              >
                <a href={d.actor.login} target="_blank" rel="noreferrer">
                  <Avatar
                    className="mr-1 align-middle p-[1px]"
                    size="xs"
                    src={d.actor.avatar_url}
                  ></Avatar>
                </a>
                <div className="flex items-center gap-2 truncate grow">
                  {d.event_type === 'PushEvent' && (
                    <EventItemPush
                      commits={d.payload.commits || []}
                      repo={d.repo}
                      head={d.payload.head || ''}
                    />
                  )}
                  {d.event_type === 'WatchEvent' && (
                    <EventItemWatch
                      payload={d.payload}
                      repo={d.repo}
                    ></EventItemWatch>
                  )}
                  {d.event_type === 'PullRequestEvent' && (
                    <EventItemPullRequest event={d}></EventItemPullRequest>
                  )}
                  {d.event_type === 'CreateEvent' && (
                    <EventItemCreate event={d}></EventItemCreate>
                  )}
                  {d.event_type === 'ForkEvent' && <EventItemFork event={d} />}
                  {d.event_type === 'IssuesEvent' && (
                    <EventItemIssues event={d}></EventItemIssues>
                  )}
                  {d.event_type === 'IssueCommentEvent' && (
                    <EventItemIssueComment event={d}></EventItemIssueComment>
                  )}
                </div>
                <div className="flex-none">
                  <Tooltip
                    content={<TimeAgo datetime={d.created_at} locale="zh_CN" />}
                  >
                    <Icon
                      icon="mdi:clock-time-two-outline"
                      className={styles.timestamp}
                    ></Icon>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        ))}
      <div ref={ref}>
        {hasNextPage ? (
          <Loading type="points" content="loading..." />
        ) : (
          <div className=" text-gray-600">Life has an end, and so do I...</div>
        )}
      </div>
    </div>
  );
};

export default EventRender;
