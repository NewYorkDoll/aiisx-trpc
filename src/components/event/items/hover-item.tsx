import { Tooltip } from '@nextui-org/react';
import { ReactNode } from 'react';

const ItemTooltip = ({
  children,
  content,
  className,
}: {
  children: ReactNode;
  content: ReactNode | string;
  className?: string;
}) => {
  return (
    <Tooltip
      content={content}
      trigger="hover"
      hideArrow={true}
      css={{
        background: '$myBlack',
        borderRadius: '$xs',
        whiteSpace: 'break-spaces',
        fontSize: '14px',
      }}
      portalClassName={className}
    >
      {children}
    </Tooltip>
  );
};

export default ItemTooltip;
