import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouterLocation = () => {
  const location = useLocation();
  const { pathname } = location;
  const isInRoute = useCallback(
    (route: string): boolean => location.pathname.includes(route),
    [location.pathname],
  );

  return {
    location,
    pathname,
    isInRoute,
  };
};
