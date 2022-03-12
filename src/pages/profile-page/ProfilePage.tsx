import React from 'react';
import { useTitle } from 'hooks';

interface ProfilePageProps {
  title?: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ title }) => {
  useTitle(title);

  return <div>This is profile page</div>;
};
