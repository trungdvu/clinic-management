import { ToTopOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';

export const BackToTop = (): JSX.Element => {
  return (
    <BackTop>
      <ToTopOutlined className="w-10 h-10 text-3xl transition-colors duration-75 bg-transparent border rounded-md text-button-primary border-button-primary hover:bg-button-primary hover:text-typo-secondary" />
    </BackTop>
  );
};
