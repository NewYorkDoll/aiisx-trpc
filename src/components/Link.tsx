import { ReactNode } from 'react';

const Link = ({
  href,
  children,
  className,
}: {
  href: string;
  children?: ReactNode;
  className?: string;
}) => {
  // 获取link
  const getLink = () => {
    return href.includes('://') ? href : `https://github.com/${href}`;
  };

  return (
    <a
      className={`text-emerald-600 ${className}`}
      target="_blank"
      href={getLink()}
      rel="noreferrer"
    >
      {children ?? href}
    </a>
  );
};

export default Link;
