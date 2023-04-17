import { EventNode } from '~/interface/github';
import ItemTooltip from './hover-item';
import Link from '~/components/Link';
import { Icon } from '@iconify/react';
import EventBlame from '../Blame';

const EventItemPullRequest = ({ event }: { event: EventNode }) => {
  const action = event.payload.action;
  const pr = event.payload.pull_request;
  const repo = event.repo;
  return (
    <div className="whitespace-nowrap flex gap-2">
      {(action == 'closed' && pr?.merged && (
        <span className="text-purple-400">merged</span>
      )) ??
        (action &&
          ['opened', 'edited', 'closed', 'reopened'].includes(action) && (
            <span>{action}</span>
          )) ??
        (action == 'synchronize' && <span>updated</span>) ??
        (action && ['assigned', 'unassigned'].includes(action) && (
          <span>changed assignees on</span>
        )) ??
        (action &&
          ['review_requested', 'review_request_removed'].includes(action) && (
            <span>requested review on</span>
          )) ??
        (action && ['labeled', 'unlabeled'].includes(action) && (
          <span>edited labels on</span>
        ))}
      pr
      <ItemTooltip content={pr?.title}>
        <Link href={pr?.html_url as string}>{`#${pr?.number}`}</Link>
      </ItemTooltip>
      {action && ['opened', 'edited', 'closed'].includes(action) && (
        <>
          via
          <ItemTooltip
            content={
              <>
                <Icon
                  icon="mdi:source-pull"
                  className="inline-block align-middle"
                ></Icon>
                {pr?.head.ref}
              </>
            }
          >
            {pr?.head.ref}
          </ItemTooltip>
          on
          <Link href={repo.name}>{repo.name}</Link>
          <EventBlame>{pr?.title}</EventBlame>
        </>
      )}
    </div>
  );
};

export default EventItemPullRequest;
