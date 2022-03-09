import React from 'react';
import { useTitle } from 'hooks';

interface SignUpPageProps {
  title?: string;
}
export const SignUpPage: React.FC<SignUpPageProps> = ({ title }) => {
  useTitle(title);

  return <div>This is sign up page</div>;
};
