import { z } from 'zod';
import { publicProcedure, router, urqlClient } from '../trpc';
import { GithubEvent } from '~/interface/github';
const EventQuery = `
query getEvents(
  $count: Int = 15
  $cursor: Cursor = null
  $order: OrderDirection = DESC
  $orderBy: GithubEventOrderField = CREATED_AT
) {
  githubevents(
    first: $count
    after: $cursor
    orderBy: { direction: $order, field: $orderBy }
  ) {
    edges {
      node {
        id
        eventType
        createdAt
        actor {
          login
          avatarURL
        }
        repo {
          name
        }
        payload
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const eventRouter = router({
  getEventList: publicProcedure
    .input(
      z.object({
        count: z.number().default(15),
        cursor: z.string().nullish().default(null),
        order: z.enum(['ASC', 'DESC']).nullish().default('DESC'),
        orderBy: z.enum(['CREATED_AT']).nullish().default('CREATED_AT'),
      }),
    )
    .query(async ({ input }) => {
      const data = await urqlClient
        .query(EventQuery, {
          count: input.count,
          cursor: input.cursor,
          order: input.order,
          orderBy: input.orderBy,
        })
        .toPromise()
        .then((result) => {
          return result.data.githubevents as GithubEvent;
        });
      return {
        items: data.edges.map((edge) => edge.node),
        hasNextPage: data.pageInfo.hasNextPage,
        nextCursor: data.pageInfo.endCursor,
      };
    }),
});
