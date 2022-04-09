import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import { Button, ButtonProps } from 'antd';

export const HyperLinkButton: React.FC<ButtonProps> = memo(
  ({ children, className, ...props }): JSX.Element => {
    const classes = useMemo(
      () =>
        classNames(
          'flex items-center justify-center',
          'font-medium',
          'transition duration-100',
          className,
        ),
      [className],
    );

    return (
      <Button type="link" className={classes} {...props}>
        {children}
      </Button>
    );
  },
);
