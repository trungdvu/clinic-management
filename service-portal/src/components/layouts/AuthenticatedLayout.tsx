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
import { motion } from 'framer-motion';
import { useRouterLocation } from 'hooks';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { defaultPageVariants } from 'utils';
import { Navbar } from '../views';
import { Text } from '../typography';

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
                <Link to={ITEM.PATH} className="flex items-center duration-75 text-primary-2">
                  <ITEM.ICON className=" text-base flex items-center" />
                  <Text className="text-base text-primary-2">{ITEM.TITLE_MENU}</Text>
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
                  <ITEM.ICON className="text-primary text-base flex items-center" />
                  <Text className="text-base">{ITEM.TITLE_MENU}</Text>
                </Link>
              </Menu.Item>
            );
          }
        })}
      </>
    );
  };

  return (
    <motion.div variants={defaultPageVariants} initial="initial" animate="animate">
      {!_.isEmpty(currentUser) && (
        <Layout {...props}>
          <Navbar />

          <Layout className="min-h-[calc(100vh-84px)] mt-5">
            <Affix offsetTop={0}>
              <Sider
                width={250}
                className="pr-3 mr-10 overflow-auto bg-white shadow-stone-300 shadow-xl select-none"
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
                      <LaptopOutlined className="text-primary text-base flex items-end" />
                      <Text className="text-base">{PAGE_ROUTES.SUPPORT.TITLE_MENU}</Text>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Sider>
            </Affix>

            {/* Page will be render through <Outlet /> */}
            <Layout>
              <Content className="pr-10 max-w-screen-2xl pt-4">
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      )}
    </motion.div>
  );
};

const mapState = (state: RootState) => ({
  currentUser: state.authModel.currentUser,
});

const mapDispatch = (dispatch: RootDispatch) => ({});

type PropsFromStores = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const AuthenticatedLayout = connect(mapState, mapDispatch)(AuthenticatedLayoutContainer);
