import React from 'react';
import { Button, ButtonProps } from 'antd';

export const PrimaryButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};
