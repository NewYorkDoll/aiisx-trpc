import CoreNavigation from '~/components/core/CoreNavigation';
import styles from './index.module.css';
import { trpc } from '~/utils/trpc';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
export async function getServerSideProps() {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });
  const switchGameList = await ssg.game.getSwitchGameList.fetch();
  // Pass data to the page via props
  return {
    props: {
      switchGameList: switchGameList.map((item) => {
        return {
          ...item,
          last_played_at: dayjs(item.last_played_at).format(
            'YYYY-MM-DD HH:mm:ss',
          ),
          create_time: dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss'),
          update_time: dayjs(item.update_time).format('YYYY-MM-DD HH:mm:ss'),
        };
      }),
    },
  };
}

const GameAreLife = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const menuOptions = [
    { to: '/', name: 'Home', alias: 'main' },
    { to: '/game-are-life', name: 'No Game No Life', alias: 'game' },
    { to: '/posts', name: 'Posts', alias: 'posts' },
    { to: '/repost', name: 'repost', alias: 'repost' },
    { to: '/contact', name: 'Contact', alias: 'sudo' },
  ];
  const switchGameList = props.switchGameList;

  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowCard(true);
    }, 1600);
  });

  return (
    <>
      <div className="flex flex-col text-[32px] h-screen items-center pt-[20vh]">
        <CoreNavigation menuOptions={menuOptions} />

        <div className={styles.switch}>
          <div className={styles.body}>
            <div className={styles.volume} />
            <div className={styles.screen}>
              {!showCard && (
                <div className={styles.logo}>
                  <div className={styles.icon}>
                    <div className={`${styles.iconPart} ${styles.left}`} />
                    <div className={`${styles.iconPart} ${styles.right}`} />
                  </div>
                  <h1>
                    <span>Nintendo</span>Switch
                  </h1>
                </div>
              )}

              {showCard && switchGameList && (
                <div className="flex w-full overflow-hidden overflow-x-auto">
                  {switchGameList.map((i) => {
                    return <div key={i.id}>{i.title_name}</div>;
                  })}
                </div>
              )}
            </div>
          </div>
          <div className={`${styles.joyCon} ${styles.left}`}>
            <div className={styles.buttonGroup}>
              <div
                className={`${styles.button} ${styles.arrow} ${styles.up}`}
              />
              <div
                className={`${styles.button} ${styles.arrow} ${styles.right}`}
              />
              <div
                className={`${styles.button} ${styles.arrow} ${styles.down}`}
              />
              <div
                className={`${styles.button} ${styles.arrow} ${styles.left}`}
              />
            </div>
            <div className={styles.stick} />
            <div className={styles.select} />
            <div className={styles.capture} />
            <div className={`${styles.shoulder} ${styles.l}`} />
          </div>
          <div className={`${styles.joyCon} ${styles.right}`}>
            <div className={styles.buttonGroup}>
              <div
                className={`${styles.button} ${styles.letter}`}
                data-letter="X"
              />
              <div
                className={`${styles.button} ${styles.letter}`}
                data-letter="A"
              />
              <div
                className={`${styles.button} ${styles.letter}`}
                data-letter="B"
              />
              <div
                className={`${styles.button} ${styles.letter}`}
                data-letter="Y"
              />
            </div>
            <div className={styles.stick} />
            <div className={styles.start} />
            <div className={styles.home} />
            <div className={`${styles.shoulder} ${styles.r}`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameAreLife;
