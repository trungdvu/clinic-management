import {
  CaretDownOutlined,
  CommentOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Divider, Dropdown, Image, Menu } from 'antd';
import { PAGE_ROUTES } from 'consts';
import { User } from 'interfaces';
import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadingSignOutModal } from '../../loadings';
import { Text } from '../../typography';

interface Props {
  currentUser: User;
  onSignOutClick: () => void;
}

export const ProfileDropdown = memo(({ currentUser, onSignOutClick }: Props) => {
  const [isLoadingSignOutModalVisible, setIsLoadingSignOutModalVisible] = useState(false);

  const _onClickSignOut = useCallback(() => {
    setIsLoadingSignOutModalVisible(true);
    onSignOutClick();
  }, [onSignOutClick]);

  const onCancelLoadingSignOutModal = useCallback(() => {
    setIsLoadingSignOutModalVisible(false);
  }, []);

  const menu = (
    <Menu className="w-56 py-0 rounded-md">
      <Menu.Item key={'0'} className="py-3 rounded-t-md">
        <Link to={PAGE_ROUTES.PROFILE.PATH} className="w-full flex items-center gap-2">
          <UserOutlined className="text-tertiary" />
          <Text>
            {currentUser.firstName} {currentUser.lastName}
          </Text>
        </Link>
      </Menu.Item>

      <Menu.Item key={'2'} className="py-3">
        <Link to={PAGE_ROUTES.HELP_CENTER.PATH} className="w-full flex items-center gap-2">
          <CommentOutlined /> Help Center
        </Link>
      </Menu.Item>

      <Menu.Item key={'-1'} className="m-0 p-0">
        <Divider className="p-0 m-0 border-brd" />
      </Menu.Item>

      <Menu.Item key={'3'} className="py-3 rounded-b-md">
        <button
          className="w-full flex items-center gap-2 text-button-pri"
          onClick={_onClickSignOut}
        >
          <LogoutOutlined />
          Sign out
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {isLoadingSignOutModalVisible && (
        <LoadingSignOutModal
          visible={isLoadingSignOutModalVisible}
          onCancel={onCancelLoadingSignOutModal}
        />
      )}

      <Dropdown overlay={menu} placement="bottomRight" className="rounded-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 shadow-sm">
            <Image
              src={require('assets/images/default_profile.jpg')}
              preview={false}
              className="rounded-md"
            />
          </div>
          <CaretDownOutlined className="text-tertiary" />
        </div>
      </Dropdown>
    </>
  );
});
