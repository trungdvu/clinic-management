import React from 'react';
import { useTitle } from 'hooks';

interface Props {
  title?: string;
}

export const AccountPage = ({ title }: Props) => {
  useTitle(title);

  return <div>This is account page</div>;
};
