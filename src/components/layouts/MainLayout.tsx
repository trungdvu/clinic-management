import { Layout, LayoutProps } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps extends LayoutProps {
  title?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ title, ...props }) => {
  return (
    <Layout {...props}>
      <h1>Header</h1>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <h1>Footer</h1>
    </Layout>
  );
};
