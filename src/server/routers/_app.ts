/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { BaseInfo, CodingStats } from '~/interface/query';
import { eventRouter } from './event';
import { gameRouter } from './game';
import { exec } from 'child_process';
import { promisify } from 'util';
import axios from 'axios';

const execPromise = promisify(exec);

function getLastCommit() {
  return execPromise('git log -n 1 --pretty=format:"%h %s"')
    .then(({ stdout }) => {
      const commitInfo = stdout.trim().split(' ');
      const commitId = commitInfo[0];
      const commitMessage = commitInfo.slice(1).join(' ');

      return { commitId, commitMessage };
    })
    .catch((error) => {
      console.error(`执行命令时出错: ${error}`);
      throw error;
    });
}

const QUERY = `
query base {
  self {
    id
    name
    login
    avatarURL
  }

  githubUser {
    login
    name
    avatarURL
    bio
    email
    location
    htmlurl
  }
  version {
    commit
    goVersion
    date
  }

  codingStats {
    totalDuration
    totalSeconds
    calculatedDays

    languages {
      language
      totalSeconds
    }
  }
}

`;

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds / 60) % 60);

  if (hours < 1 && minutes < 1) {
    minutes = 1;
  }

  return `${hours} hrs ${minutes} mins`;
}

// 维护一个缓存 30分钟更新一次
const _cache = {
  data: null as unknown as CodingStats,
  time: 0,
};
const wakapi_url = process.env.WAKAPI_URL;
const wakapi_key = process.env.WAKAPI_KEY || '';

export const appRouter = router({
  getBaseInfo: publicProcedure.query(async () => {
    const result = {
      self: null,
      githubUser: {
        login: 'NewYorkDoll',
        name: 'yiziluoying',
        avatarURL: 'https://avatars.githubusercontent.com/u/70010012?v=4',
        bio: 'Just so so',
        email: null,
        location: null,
        htmlurl: 'https://github.com/NewYorkDoll',
        __typename: 'GithubUser',
      },
      version: {},
      codingStats: {},
    } as unknown as BaseInfo;
    result.version.commit = (await getLastCommit()).commitMessage;
    result.version.date = process.env.BUILD_TIME ?? 'n/a';
    result.version.goVersion = process.version;

    if (!_cache.data || Date.now() - _cache.time > 30 * 60 * 1000) {
      const wkdata = await axios.get(
        wakapi_url + '/api/summary?interval=last_30_days',
        {
          headers: {
            // base64 encode wakapi_key
            Authorization: `Basic ${Buffer.from(wakapi_key).toString(
              'base64',
            )}`,
            Accept: 'application/json',
          },
        },
      );
      const wakapiData = wkdata.data;
      wakapiData.TotalSeconds = 0;
      for (let index = 0; index < wkdata.data.languages.length; index++) {
        const element = wkdata.data.languages[index];
        element.language = element.key;
        element.TotalDuration = formatDuration(element.total);
        wakapiData.TotalSeconds += element.total;
      }
      wakapiData.totalDuration = formatDuration(wakapiData.TotalSeconds);
      wakapiData.calculatedDays = 30;
      _cache.data = wakapiData;
      _cache.time = Date.now();
    }
    result.codingStats = _cache.data;

    return result;
  }),
  event: eventRouter,
  game: gameRouter,
});

export type AppRouter = typeof appRouter;
