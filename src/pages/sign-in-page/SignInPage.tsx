import React from 'react';
import { useTitle } from 'hooks';

interface SignInPageProps {
  title?: string;
}

export const SignInPage: React.FC<SignInPageProps> = ({ title }) => {
  useTitle(title);

  return <div>This is sign in page</div>;
};
