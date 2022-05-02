import classNames from 'classnames';
import { useOnlineStatus } from 'hooks/useOnlineStatus';
import { memo, useEffect, useState } from 'react';
import { Text } from '../typography';

interface Props {
  className?: string;
}

export const NetworkStatus = memo(({ className }: Props) => {
  const [onlineVisible, setOnlineVisible] = useState(false);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    !onlineStatus && setOnlineVisible(true);
    setTimeout(() => onlineStatus && setOnlineVisible(false), 2000);
  }, [onlineStatus]);

  return (
    <div
      className={classNames(
        'fixed bottom-0 right-0 w-full h-10 flex items-center justify-center transition-all ease-linear duration-200',
        {
          'bg-base-secondary py-2 opacity-100 ': !onlineStatus,
          'bg-typo-success py-2 opacity-100': onlineStatus && onlineVisible,
          'py-0 h-0 opacity-0': !onlineVisible && onlineStatus,
        },
        className,
      )}
    >
      <Text
        className={classNames('text-white transition-all duration-200', {
          'py-0 h-0 opacity-0': !onlineVisible && onlineStatus,
        })}
      >
        {onlineStatus ? 'Back online' : 'No connection'}
      </Text>
    </div>
  );
});
