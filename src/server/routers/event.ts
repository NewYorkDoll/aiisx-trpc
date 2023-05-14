import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '../prisma';
import { GithubEvent } from '~/interface/github';

export const eventRouter = router({
  getEventList: publicProcedure
    .input(
      z.object({
        count: z.number().default(15),
        cursor: z.number().default(1),
        order: z.enum(['ASC', 'DESC']).nullish().default('DESC'),
        orderBy: z.enum(['CREATED_AT']).nullish().default('CREATED_AT'),
      }),
    )
    .query(async ({ input }) => {
      // 分页查询
      const data = await prisma.github_events.findMany({
        take: input.count,
        skip: input.count * (input.cursor - 1),
      });

      // 是否有下一页
      const hasNextPage =
        (await prisma.github_events.count({
          skip: input.count * input.cursor,
        })) > 0;

      return {
        items: data.map((item) => ({
          ...(item as unknown as GithubEvent),
        })),
        hasNextPage: hasNextPage,
        nextCursor: input.cursor + 1,
      };
    }),
});
