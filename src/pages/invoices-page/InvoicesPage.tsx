import React from 'react';
import { useTitle } from 'hooks';

interface InvoicesPageProps {
  title?: string;
}

export const InvoicesPage: React.FC<InvoicesPageProps> = ({ title }) => {
  useTitle(title);

  return <div>This is invoices page</div>;
};
