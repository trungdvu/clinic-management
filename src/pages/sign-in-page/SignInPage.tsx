import React from 'react';
import { useTitle } from 'hooks';

interface SignInPageProps {}

export const SignInPage: React.FC<SignInPageProps> = () => {
  useTitle('GoodClinic - Sign in');

  return <div>This is sign in page</div>;
};
