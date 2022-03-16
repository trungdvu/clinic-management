import React from 'react';
import { useTitle } from 'hooks';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  useTitle('GoodClinic - Page not found');

  return (
    <div>
      <p>Page Not Found</p>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};
