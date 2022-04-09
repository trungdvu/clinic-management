import { Typography } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';
import classNames from 'classnames';
import React, { memo } from 'react';

const { Text: AntText } = Typography;

export const Text: React.FC<TextProps> = memo(
  ({ children, className, type = 'primary', ...props }): JSX.Element => {
    const colors: any = {
      success: 'text-info-suc',
      secondary: 'text-sec',
      warning: 'text-info-war',
      danger: 'text-info-err',
    };

    return (
      <AntText className={classNames('font-sans text-inherit', colors[type], className)} {...props}>
        {children}
      </AntText>
    );
  },
);
