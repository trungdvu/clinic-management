import {
  DashboardOutlined,
  DollarOutlined,
  LaptopOutlined,
  RiseOutlined,
  SettingOutlined,
  SnippetsOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Affix, Layout, LayoutProps, Menu } from 'antd';
import { PAGE_ROUTES } from 'consts';
import { useRouterLocation } from 'hooks';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { Navbar } from '../views';

const { Content, Sider } = Layout;

const SIDER_MENU_ITEMS = [
  { ...PAGE_ROUTES.DASHBOARD, ICON: DashboardOutlined },
  { ...PAGE_ROUTES.MEDICAL_BILLS, ICON: SnippetsOutlined },
  { ...PAGE_ROUTES.PATIENTS, ICON: TeamOutlined },
  { ...PAGE_ROUTES.INVOICES, ICON: DollarOutlined },
  { ...PAGE_ROUTES.STATISTICS, ICON: RiseOutlined },
  { ...PAGE_ROUTES.ACCOUNT, ICON: SettingOutlined },
];

interface Props extends PropsFromStores, LayoutProps {
  title?: string;
}

const AuthenticatedLayoutContainer = ({ title, currentUser, ...props }: Props) => {
  const { pathname, isInRoute } = useRouterLocation();

  const renderMenuItems = () => {
    return (
      <>
        {_.map(SIDER_MENU_ITEMS, (ITEM) => {
          if (isInRoute(ITEM.PATH)) {
            return (
              <Menu.Item
                key={`${ITEM.PATH}`}
                className="flex items-center py-6 m-0 rounded-r-md bg-button-pri"
              >
                <Link to={ITEM.PATH} className="flex items-center duration-75">
                  <ITEM.ICON className="text-primary-2" />
                  <span className="text-primary-2">{ITEM.TITLE_MENU}</span>
                </Link>
              </Menu.Item>
            );
          } else {
            return (
              <Menu.Item
                key={`${ITEM.PATH}`}
                className="flex items-center py-6 m-0 duration-75 rounded-r-md hover:bg-black hover:bg-opacity-5"
              >
                <Link to={ITEM.PATH} className="flex items-center hover:text-primary">
                  <ITEM.ICON className="text-primary" />
                  <span>{ITEM.TITLE_MENU}</span>
                </Link>
              </Menu.Item>
            );
          }
        })}
      </>
    );
  };

  return (
    <>
      {!_.isEmpty(currentUser) && (
        <Layout {...props}>
          <Navbar />

          <Layout className="min-h-[calc(100vh-84px)] mt-5">
            <Affix offsetTop={0}>
              <Sider
                width={250}
                className="pr-3 mr-3 overflow-auto bg-transparent border-r-2 select-none border-brd"
              >
                <Menu
                  defaultSelectedKeys={[`${pathname}`]}
                  className="h-screen bg-transparent border-r-0 rounded-sm"
                >
                  {renderMenuItems()}
                  <Menu.Item
                    key={`${PAGE_ROUTES.SUPPORT.PATH}`}
                    className="flex items-center py-6 m-0 rounded-r-md hover:bg-black hover:bg-opacity-5"
                  >
                    <Link
                      to={PAGE_ROUTES.SUPPORT.PATH}
                      className="flex items-center hover:text-primary"
                    >
                      <LaptopOutlined className="text-primary" />
                      <span>{PAGE_ROUTES.SUPPORT.TITLE_MENU}</span>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Sider>
            </Affix>

            {/* Page will be render through <Outlet /> */}
            <Layout>
              <Content className="pr-5">
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      )}
    </>
  );
};

const mapState = (state: RootState) => ({
  currentUser: state.authModel.currentUser,
});

const mapDispatch = (dispatch: RootDispatch) => ({});

type PropsFromStores = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const AuthenticatedLayout = connect(mapState, mapDispatch)(AuthenticatedLayoutContainer);
