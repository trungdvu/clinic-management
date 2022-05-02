import { PAGE_ROUTES } from 'consts';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../typography';

export const NonAuthFooter = memo((): JSX.Element => {
  return (
    <div className="w-screen mt-20 bg-base-secondary text-typo-secondary">
      <div className="flex items-center justify-between max-w-5xl px-5 mx-auto h-14">
        <Link
          to={PAGE_ROUTES.HELP_CENTER.PATH}
          className="text-xs hover:underline text-typo-secondary"
        >
          Help Center
        </Link>

        <Text className="text-xs text-typo-secondary">ClinicX @ {new Date().getFullYear()}</Text>

        <a
          href="https://github.com/trungdvu/clinic-management"
          target="_blank"
          rel="noreferrer"
          className="text-xs hover:underline text-typo-secondary"
        >
          About us
        </a>
      </div>
    </div>
  );
});
