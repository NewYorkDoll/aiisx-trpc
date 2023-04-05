import Link from 'next/link';
import styles from './CoreNavigation.module.css';
const CoreNavigation = () => {
  const menuOptions = [
    { to: '/', name: 'Home', alias: 'main' },
    { to: '/posts', name: 'Posts', alias: 'posts' },
    { to: '/repost', name: 'repost', alias: 'repost' },
    { to: '/about', name: 'About', alias: 'github' },
    { to: '/contact', name: 'Contact', alias: 'sudo' },
  ];
  return (
    <>
      <ul
        className={`flex flex-wrap justify-center md:justify-start md:gap-x-2 ${styles.navigation}`}
      >
        {menuOptions.map((option) => (
          <li key={option.name}>
            <Link href={option.to}>{option.alias}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CoreNavigation;
