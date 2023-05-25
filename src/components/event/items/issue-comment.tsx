import Link from '~/components/Link';
import { GithubEvent } from '~/interface/github';
import ItemTooltip from './hover-item';
import EventBlame from '../Blame';

const EventItemIssueComment = ({ event }: { event: GithubEvent }) => {
  const repo = event.repo;
  const action = event.payload.action || '';
  const issue = event.payload.issue;
  const comment = event.payload.comment;
  return (
    <div className="whitespace-nowrap flex gap-2">
      <span className="text-lime-300">
        {(action == 'created' && 'added') ??
          (action == 'edited' && 'updated') ??
          (action == 'deleted' && 'removed')}
      </span>
      a
      <Link
        className="text-cyan-400 hover:text-cyan-500"
        href={comment?.html_url || ''}
      >
        comment
      </Link>
      to issue
      <ItemTooltip content={issue?.title}>
        <Link href={issue?.html_url || ''}>#{issue?.number}</Link>
      </ItemTooltip>
      on
      <Link href={repo.name}>{repo.name}</Link>
      <EventBlame>{issue?.title}</EventBlame>
    </div>
  );
};

export default EventItemIssueComment;
