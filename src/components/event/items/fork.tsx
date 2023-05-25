import { GithubEvent } from '~/interface/github';
import Link from '~/components/Link';
import EventBlame from '../Blame';

const EventItemFork = ({ event }: { event: GithubEvent }) => {
  const repo = event.repo;
  const fork = event.payload.forkee;
  return (
    <div className="whitespace-nowrap flex gap-2">
      <span className="text-purple-400">forked</span>
      <Link href={repo.name}>{repo.name}</Link>
      to
      {fork?.full_name && <Link href={fork?.full_name}>{fork.full_name}</Link>}
      <EventBlame>{fork?.description}</EventBlame>
    </div>
  );
};
export default EventItemFork;
