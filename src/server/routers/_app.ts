/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router, urqlClient } from '../trpc';
import { postRouter } from './post';
import { BaseInfo } from '~/interface/query';
import { z } from 'zod';
import { eventRouter } from './event';

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
  getBaseInfo: publicProcedure.query(async () => {
    return await urqlClient
      .query(QUERY, {})
      .toPromise()
      .then((result) => {
        return result.data as BaseInfo;
      });
  }),
  post: postRouter,
  event: eventRouter,
});

export type AppRouter = typeof appRouter;
