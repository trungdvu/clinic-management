import { Typography } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';
import classNames from 'classnames';
import React, { memo } from 'react';

const { Text: AntText } = Typography;

export const Text: React.FC<TextProps> = memo(
  ({ children, className, type, ...props }): JSX.Element => {
    return (
      <AntText
        className={classNames(
          'font-sans',
          {
            'text-inherit': !type,
            'text-info-err': type === 'danger',
            'text-info-suc': type === 'success',
            'text-tertiary': type === 'secondary',
            'text-info-war': type === 'warning',
          },
          className,
        )}
        {...props}
      >
        {children}
      </AntText>
    );
  },
);
