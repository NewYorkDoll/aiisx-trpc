import { Loading } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const About = () => {
  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    window.open(query.to as string);

    window.location.href = '/';
  }, [query.to]);
  return (
    <>
      <Loading color="primary">Redirecting...</Loading>
    </>
  );
};

export default About;
