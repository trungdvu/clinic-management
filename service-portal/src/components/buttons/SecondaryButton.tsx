import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import { Button, ButtonProps } from 'antd';

export const SecondaryButton: React.FC<ButtonProps> = memo(
  ({ children, className, style, loading, ...props }): JSX.Element => {
    const classes = useMemo(
      () =>
        classNames(
          'flex items-center justify-center rounded-md min-w-[150px]',
          'bg-transparent',
          'transition duration-100',
          'border-2 border-button-primary',
          'text-sm text-button-primary font-medium',
          'hover:border-button-primary-hv hover:text-button-primary-hv',
          'active:bg-transparent active:text-button-primary active:border-button-primary',
          'disabled:text-button-primary disabled:border-button-primary disabled:opacity-50',
          'focus:none',
          {
            'border-opacity-30 text-button-primary hover:bg-transparent hover:text-button-primary hover:cursor-not-allowed':
              loading,
          },
          className,
        ),
      [className, loading],
    );

    const styles = useMemo(
      () => ({
        ...style,
      }),
      [style],
    );

    return (
      <Button size="large" loading={loading} className={classes} style={styles} {...props}>
        {children}
      </Button>
    );
  },
);
