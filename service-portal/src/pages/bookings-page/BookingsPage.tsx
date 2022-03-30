import React from 'react';
import { useTitle } from 'hooks';

interface Props {
  title?: string;
}

export const BookingsPage = ({ title }: Props) => {
  useTitle(title);

  return <div>This is bookings page</div>;
};
