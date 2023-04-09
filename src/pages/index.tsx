import { trpc } from '../utils/trpc';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { NextPageWithLayout } from './_app';
import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import { Fragment } from 'react';
import type { AppRouter } from '~/server/routers/_app';
import { appRouter } from '~/server/routers/_app';
import { Button } from '@nextui-org/react';
import TerminalLayout from '~/components/TerminalLayout';
import { GetServerSidePropsContext } from 'next';
import superjson from 'superjson';
import { BaseInfo } from '~/interface/query';
import EventRender from '../components/event/render';
export async function getServerSideProps() {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });
  const baseInfo = await ssg.getBaseInfo.fetch();
  // Pass data to the page via props
  return { props: { baseInfo: baseInfo } };
}

const IndexPage: NextPageWithLayout = (props) => {
  const baseInfo = (props as { baseInfo: BaseInfo }).baseInfo;

  return (
    <>
      {baseInfo && (
        <TerminalLayout baseInfo={baseInfo}>
          <EventRender />
        </TerminalLayout>
      )}
    </>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createProxySSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
