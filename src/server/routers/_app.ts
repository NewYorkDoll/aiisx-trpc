/**
 * This file contains the root router of your tRPC-backend
 */
import { Client, cacheExchange, fetchExchange } from '@urql/core';
import { publicProcedure, router } from '../trpc';
import { postRouter } from './post';
import { BaseInfo } from '~/interface/query';

const client = new Client({
  url: 'http://192.168.100.158:8080/query',
  exchanges: [cacheExchange, fetchExchange],
});

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

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  getBaseInfo: publicProcedure.query(async () => {
    return await client
      .query(QUERY, {})
      .toPromise()
      .then((result) => {
        return result.data as BaseInfo;
      });
  }),
  post: postRouter,
});

export type AppRouter = typeof appRouter;
