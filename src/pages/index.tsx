import { createServerSideHelpers } from '@trpc/react-query/server';
import { NextPageWithLayout } from './_app';
import { Fragment, useState } from 'react';
import { appRouter } from '~/server/routers/_app';
import TerminalLayout from '~/components/TerminalLayout';
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
  const [eventCount, setEventCount] = useState(0);
  const stateChange = (conut: number) => {
    setEventCount(conut);
  };
  return (
    <>
      {baseInfo && (
        <TerminalLayout
          baseInfo={baseInfo}
          countSlot={
            eventCount > 0 && (
              <span className="bar-item misc"> ln:{eventCount} </span>
            )
          }
        >
          <EventRender stateChange={stateChange} />
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
