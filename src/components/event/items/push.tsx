import { Commit, Repo } from '~/interface/github';
import ItemTooltip from './hover-item';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const EventItemPush = ({
  commits,
  repo,
  head,
}: {
  head: string;
  commits: Commit[];
  repo: Repo;
}) => {
  // 获取link
  const getLink = () => {
    if (commits.length > 1) {
      const url = `${repo.name}/compare/${commits[0]?.sha}...${head}`;
      return repo.name.includes('://') ? url : `https://github.com/${url}`;
    } else {
      const url = `${repo.name}/commit/${commits[0]?.sha}`;
      return repo.name.includes('://') ? url : `https://github.com/${url}`;
    }
  };

  return (
    <div className="whitespace-nowrap">
      <span className="text-[#d086ff]">pushed</span>
      {commits[0] && commits.length > 1 ? (
        <span>
          <ItemTooltip
            content={commits.map((commit) => (
              <p key={commit.sha} className="truncate" title={commit.message}>
                {commit.sha.slice(0, 7)}:{commit.message.split('\n')[0]}
              </p>
            ))}
            className="max-w-[350px]"
          >
            <a
              className="text-emerald-600"
              target="_blank"
              href={getLink()}
              rel="noreferrer"
            >
              {`${commits.length} commits`}
            </a>
          </ItemTooltip>
        </span>
      ) : (
        <span>
          <ItemTooltip
            // href={`repo.name + '/commit/' + ${commits[0]?.sha} `}
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
            <a
              className="text-emerald-600"
              target="_blank"
              href={getLink()}
              rel="noreferrer"
            >
              {commits[0]?.sha.slice(0, 7)}
            </a>
          </ItemTooltip>
        </span>
      )}
    </div>
  );
};

export default EventItemPush;
