import React from 'react';
import { useTitle } from 'hooks';

interface BookingsPageProps {
  title?: string;
}

export const BookingsPage: React.FC<BookingsPageProps> = ({ title }) => {
  useTitle(title);

  return <div>This is bookings page</div>;
};
