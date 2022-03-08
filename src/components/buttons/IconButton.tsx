import React from 'react';
import classNames from 'classnames';
import { Button, ButtonProps } from 'antd';

type IconButtonProps = Pick<ButtonProps, Exclude<keyof ButtonProps, 'children'>>;

export const IconButton = ({ className, ...props }: IconButtonProps) => {
  const classes = React.useMemo(
    () =>
      classNames(
        'text-primary hover:text-primary-2 hover:bg-button-pri border-brd hover:border-button-pri',
        className,
      ),
    [className],
  );

  return <Button shape="circle" className={classes} {...props} />;
};
