import { EventNode } from '~/interface/github';
import ItemTooltip from './hover-item';
import { Icon } from '@iconify/react';
import Link from '~/components/Link';

const EventItemCreate = ({ event }: { event: EventNode }) => {
  return (
    <div className="whitespace-nowrap flex gap-2">
      {' '}
      <span className="text-lime-500">created</span>
      {event.payload.ref && (
        <>
          {
            <ItemTooltip content={event.payload.ref}>
              <>
                <div className="flex items-center">
                  {event.payload.ref_type == 'branch' ? (
                    <Icon
                      icon="mdi:source-branch"
                      className="inline-block align-middle"
                    ></Icon>
                  ) : (
                    <Icon
                      icon="mdi:tag"
                      className="inline-block align-middle"
                    ></Icon>
                  )}
                  {event.payload.ref}
                </div>
              </>
            </ItemTooltip>
          }
          on
        </>
      )}
      <Link href={event.repo.name}></Link>
    </div>
  );
};
export default EventItemCreate;
