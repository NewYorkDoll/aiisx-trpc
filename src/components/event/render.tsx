import { trpc } from '~/utils/trpc';
import { useEffect, useRef, useState } from 'react';
import { useInViewport, useUpdateEffect } from 'ahooks';
import { Avatar, Loading, Tooltip } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import TimeAgo from 'timeago-react';
import styles from './render.module.css';
import EventItemPush from './items/push';
const EventRender = () => {
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
  const [cursor] = useState<string | null>(null);
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
    console.log(total);
  }, [total]);
  return (
    <div className="h-full overflow-y-scroll overflow-x-hidden text-[0.9em] grow basis-0">
      {query.isFetched &&
        query.data?.pages.map((page, i) => (
          <div key={i}>
            {page.items.map((d, i2) => (
              <div
                key={d.id}
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
                    src={d.actor.avatarURL}
                  ></Avatar>
                </a>
                <div className="flex items-center gap-2 truncate grow">
                  {d.eventType === 'PushEvent' && (
                    <EventItemPush
                      commits={d.payload.commits}
                      repo={d.repo}
                      head={d.payload.head}
                    />
                  )}
                </div>
                <div className="flex-none">
                  <Tooltip
                    content={<TimeAgo datetime={d.createdAt} locale="zh_CN" />}
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
