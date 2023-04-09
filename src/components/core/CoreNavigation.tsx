import Link from 'next/link';
import styles from './CoreNavigation.module.css';
const CoreNavigation = ({
  menuOptions,
}: {
  menuOptions: {
    to: string;
    name: string;
    alias: string;
  }[];
}) => {
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
