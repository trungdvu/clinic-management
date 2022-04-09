import Title, { TitleProps } from 'antd/lib/typography/Title';
import classNames from 'classnames';
import React, { memo } from 'react';

export const Heading: React.FC<TitleProps> = memo(
  ({ children, level = 4, className, ...props }): JSX.Element => {
    return (
      <Title
        level={level}
        className={classNames('font-heading text-primary', className)}
        {...props}
      >
        {children}
      </Title>
    );
  },
);
