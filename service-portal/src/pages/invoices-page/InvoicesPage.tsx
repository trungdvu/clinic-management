import React from 'react';
import { useTitle } from 'hooks';

interface Props {
  title?: string;
}

export const InvoicesPage = ({ title }: Props) => {
  useTitle(title);

  return <div>This is invoices page</div>;
};
