import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RootDispatch } from 'store/index';

const ONLINE_POLLING_INTERVAL = 10000;

export function useOnlineStatus() {
  const [onlineStatus, setOnlineStatus] = useState(true);
  const dispatch = useDispatch<RootDispatch>();

  const checkStatus = useCallback(async () => {
    const online = await dispatch.appModel.checkOnlineStatus();
    setOnlineStatus(online);
  }, [dispatch.appModel]);

  useEffect(() => {
    window.addEventListener('offline', () => setOnlineStatus(false));
    const id = setInterval(() => {
      checkStatus();
    }, ONLINE_POLLING_INTERVAL);

    return () => {
      window.removeEventListener('offline', () => setOnlineStatus(false));
      clearInterval(id);
    };
  }, [checkStatus]);

  return onlineStatus;
}
