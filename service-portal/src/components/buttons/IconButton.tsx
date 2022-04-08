import React from 'react';
import classNames from 'classnames';
import { Button, ButtonProps } from 'antd';

type IconButtonProps = Pick<ButtonProps, Exclude<keyof ButtonProps, 'children'>>;

export const IconButton = ({ className, ...props }: IconButtonProps) => {
  const classes = React.useMemo(
    () =>
      classNames(
        'text-primary hover:bg-black hover:bg-opacity-5 hover:border-brd border-brd active:bg-opacity-10 duration-100',
        className,
      ),
    [className],
  );

  return <Button shape="circle" className={classes} {...props} />;
};
