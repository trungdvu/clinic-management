import React from 'react';
import classNames from 'classnames';
import { Button, ButtonProps } from 'antd';

export const HyperLinkButton: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  const classes = React.useMemo(
    () => classNames('font-medium flex items-center justify-center duration-100', className),
    [className],
  );

  return (
    <Button type="link" className={classes} {...props}>
      {children}
    </Button>
  );
};
