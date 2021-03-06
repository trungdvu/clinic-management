import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';
import { memo, useMemo } from 'react';

type Props = Pick<ButtonProps, Exclude<keyof ButtonProps, 'children'>>;

export const IconButton = memo(({ className, ...props }: Props): JSX.Element => {
  const classes = useMemo(
    () =>
      classNames(
        'text-typo-tertiary',
        'transition duration-100',
        'border-line-primary',
        'bg-transparent',
        'hover:bg-black hover:bg-opacity-5 hover:border-typo-tertiary',
        'active:bg-opacity-[10%]',
        'disabled:bg-[#f5f5f5] disabled:cursor-not-allowed',
        'focus:none',
        className,
      ),
    [className],
  );

  return <Button shape="circle" className={classes} {...props} />;
});
