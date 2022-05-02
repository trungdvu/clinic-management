import classNames from 'classnames';
import { useOnlineStatus } from 'hooks/useOnlineStatus';
import { memo, useEffect, useState } from 'react';
import { Text } from '../typography';

export const NetworkStatus = memo(() => {
  const [onlineVisible, setOnlineVisible] = useState(false);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    setTimeout(() => setOnlineVisible(!onlineStatus), 1000);
  }, [onlineStatus]);

  return (
    <div
      className={classNames(
        'fixed bottom-0 right-0 w-full flex items-center justify-center transition-all duration-200',
        {
          'bg-base-secondary py-2 opacity-100 ': !onlineStatus,
          'bg-typo-success py-2 opacity-100': onlineStatus,
          'py-0 h-0 opacity-0': !onlineVisible,
        },
      )}
    >
      <Text
        className={classNames('text-white transition-all duration-200', {
          'py-0 h-0 opacity-0': !onlineVisible,
        })}
      >
        {onlineStatus ? 'Back online' : 'No connection'}
      </Text>
    </div>
  );
});
