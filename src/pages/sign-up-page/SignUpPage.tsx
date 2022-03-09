import React from 'react';
import { useTitle } from 'hooks';

interface SignUpPageProps {}
export const SignUpPage: React.FC<SignUpPageProps> = () => {
  useTitle('GoodClinic - Sign up');

  return <div>This is sign up page</div>;
};
