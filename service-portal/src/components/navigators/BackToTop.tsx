import { ToTopOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';

export const BackToTop = (): JSX.Element => {
  return (
    <BackTop>
      <ToTopOutlined className="w-10 h-10 text-3xl transition-colors duration-75 bg-transparent border rounded-md text-button-pri border-button-pri hover:bg-button-pri hover:text-primary-2" />
    </BackTop>
  );
};
