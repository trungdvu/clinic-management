import React from 'react';
import classNames from 'classnames';
import { Typography } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';

const { Text: AntText } = Typography;

export const Text: React.FC<TextProps> = ({ children, className, type = 'primary', ...props }) => {
  const colors: any = {
    success: 'text-info-suc',
    secondary: 'text-sec',
    warning: 'text-info-war',
    danger: 'text-info-err',
    primary: 'text-primary',
  };

  return (
    <AntText className={classNames('font-sans', colors[type], className)} {...props}>
      {children}
    </AntText>
  );
};
