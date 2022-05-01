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
            'text-typo-error': type === 'danger',
            'text-typo-success': type === 'success',
            'text-typo-tertiary': type === 'secondary',
            'text-typo-warning': type === 'warning',
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
