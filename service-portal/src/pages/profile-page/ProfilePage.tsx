import React from 'react';
import { useTitle } from 'hooks';

interface Props {
  title?: string;
}

export const ProfilePage = ({ title }: Props) => {
  useTitle(title);

  return <div>This is profile page</div>;
};
