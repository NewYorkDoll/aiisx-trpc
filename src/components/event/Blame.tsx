import { ReactNode } from 'react';

const EventBlame = ({ children }: { children: ReactNode }) => {
  return (
    <span className="flex-1 lowercase truncate select-none text-zinc-600">
      {children}
    </span>
  );
};

export default EventBlame;
