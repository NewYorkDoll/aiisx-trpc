import { EventNode } from '~/interface/github';
import ItemTooltip from './hover-item';
import Link from '~/components/Link';
import EventBlame from '../Blame';

const EventItemIssues = ({ event }: { event: EventNode }) => {
  const repo = event.repo;
  const action = event.payload.action || '';
  const issue = event.payload.issue;

  return (
    <>
      <div className="whitespace-nowrap flex gap-2">
        <span className="text-cyan-400">
          {(['opened', 'edited', 'closed', 'reopened'].includes(action) && (
            <span>{action}</span>
          )) ??
            (['assigned', 'unassigned'].includes(action) && (
              <span>changed assignees on</span>
            )) ??
            (['labeled', 'unlabeled'].includes(action) && (
              <span> edited labels on</span>
            ))}
        </span>
        issue
        <ItemTooltip content={issue?.title}>
          <Link href={issue?.html_url || ''}>#{issue?.number}</Link>
        </ItemTooltip>
        on
        <Link href={repo.name}>{repo.name}</Link>
        <EventBlame>{issue?.title}</EventBlame>
      </div>
    </>
  );
};

export default EventItemIssues;
