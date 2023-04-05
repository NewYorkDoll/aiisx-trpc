import { ReactNode } from 'react';
import CoreTerminal from './core/CoreTerminal';
import CoreNavigation from './core/CoreNavigation';
import { Card } from '@nextui-org/react';
import styles from './TerminalLayout.module.css';
const TerminalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex items-stretch justify-center flex-auto w-full lg:items-center h-[100vh]">
        <div className="flex h-full w-full shrink grow-0 basis-auto flex-col items-stretch pt-[15px] md:items-center lg:max-h-[28rem] lg:max-w-3xl">
          <CoreNavigation />
          <CoreTerminal path="~" prefix="aiisx" value="Hello!" />
          <Card
            className="flex flex-auto w-full h-full p-0 rounded-[4px] border-none"
            css={{ padding: 0, display: 'flex', flexDirection: 'column' }}
            isHoverable={true}
          >
            {children}
            <Card.Footer
              className={
                styles.bottomBar +
                ' rounded-[4px] rounded-tr-[0] rounded-tl-[0] border-[1px] border-[#ffffff17]'
              }
            ></Card.Footer>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TerminalLayout;
