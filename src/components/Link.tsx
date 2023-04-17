import { ReactNode } from 'react';

const Link = ({ href, children }: { href: string; children?: ReactNode }) => {
  // 获取link
  const getLink = () => {
    return href.includes('://') ? href : `https://github.com/${href}`;
  };

  return (
    <a
      className="text-emerald-600"
      target="_blank"
      href={getLink()}
      rel="noreferrer"
    >
      {children ?? href}
    </a>
  );
};

export default Link;
