import { PAGE_ROUTES } from 'consts';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../typography';

export const NonAuthFooter = memo((): JSX.Element => {
  return (
    <div className="w-screen mt-20 bg-base-sec text-primary-2">
      <div className="flex justify-between max-w-5xl px-5 py-5 mx-auto">
        <Link to={PAGE_ROUTES.HELP_CENTER.PATH} className="text-xs hover:underline text-primary-2">
          Help Center
        </Link>

        <Text className="text-xs text-primary-2">XClinic @ {new Date().getFullYear()}</Text>

        <a
          href="https://github.com/trungdvu/clinic-management"
          target="_blank"
          rel="noreferrer"
          className="text-xs hover:underline text-primary-2"
        >
          About us
        </a>
      </div>
    </div>
  );
});
