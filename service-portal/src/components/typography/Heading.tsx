import React from 'react';
import classNames from 'classnames';
import Title, { TitleProps } from 'antd/lib/typography/Title';

export const Heading: React.FC<TitleProps> = ({ children, level = 4, className, ...props }) => {
  return (
    <Title level={level} className={classNames('font-heading text-primary', className)} {...props}>
      {children}
    </Title>
  );
};
