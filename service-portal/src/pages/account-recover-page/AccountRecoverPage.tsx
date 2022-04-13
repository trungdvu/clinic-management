import { useTitle } from 'hooks';

interface Props {
  title?: string;
}

export const AccountRecoverPage = ({ title }: Props) => {
  useTitle(title);

  return <div>This is recover password page</div>;
};
