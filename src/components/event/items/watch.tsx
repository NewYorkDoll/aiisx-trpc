import Link from '~/components/Link';
import { Payload, Repo } from '~/interface/github';

const EventItemWatch = ({
  repo,
  payload,
}: {
  repo: Repo;
  payload: Payload;
}) => {
  return (
    <div className="text-amber-300 flex gap-2">
      {payload.action == 'started' ? 'starred' : 'unstarred'}
      <Link href={repo.name} />
    </div>
  );
};

export default EventItemWatch;
