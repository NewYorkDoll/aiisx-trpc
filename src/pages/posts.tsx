import { Button } from '@nextui-org/react';
import Link from 'next/link';
import UnderConstruction from '~/assets/UnderConstruction.gif';

const PostsIndex = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center flex-col">
      <img src={UnderConstruction.src} alt="Under Construction" />
      <p className="text-4xl text-red-200">Under Construction</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};
export default PostsIndex;
