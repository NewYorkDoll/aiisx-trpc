import { Commit, Repo } from '~/interface/github';
import ItemTooltip from './hover-item';
import { Icon } from '@iconify/react';
import Link from '~/components/Link';
import EventBlame from '../Blame';

const EventItemPush = ({
  commits,
  repo,
  head,
}: {
  head: string;
  commits: Commit[];
  repo: Repo;
}) => {
  return (
    <div className="whitespace-nowrap">
      <span className="text-[#d086ff]">pushed</span>
      {commits[0] && commits.length > 1 ? (
        <span>
          <ItemTooltip
            content={
              <>
                {commits.map((commit) => (
                  <div
                    className="flex items-center justify-start"
                    key={commit.url}
                  >
                    <Icon
                      icon="mdi:source-commit"
                      className="inline-block align-middle"
                    ></Icon>
                    <p
                      key={commit.sha}
                      className="truncate flex-1"
                      title={commit.message}
                    >
                      {commit.sha.slice(0, 7)}:{commit.message.split('\n')[0]}
                    </p>
                  </div>
                ))}
              </>
            }
            className="max-w-[350px]"
          >
            <Link href={`${repo.name}/compare/${commits[0]?.sha}...${head}`}>
              {`${commits.length} commits`}
            </Link>
          </ItemTooltip>
        </span>
      ) : (
        <span>
          <ItemTooltip
            content={
              <>
                <Icon
                  icon="mdi:source-commit"
                  className="inline-block align-middle"
                ></Icon>
                {commits[0]?.sha.slice(0, 7)}:
                {commits[0]?.message.split('\n')[0]}
              </>
            }
          >
            <Link href={`${repo.name}/commit/${commits[0]?.sha}`}>
              {commits[0]?.sha.slice(0, 7)}
            </Link>
          </ItemTooltip>
        </span>
      )}
      to
      <Link href={repo.name}></Link>
      <EventBlame>{commits[0]?.message.split('\n')[0]}</EventBlame>
    </div>
  );
};

export default EventItemPush;
