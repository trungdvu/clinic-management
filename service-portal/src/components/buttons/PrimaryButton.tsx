import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import { Button, ButtonProps } from 'antd';

export const PrimaryButton: React.FC<ButtonProps> = memo(
  ({ children, className, style, loading, ...props }) => {
    const classes = useMemo(
      () =>
        classNames(
          'flex justify-center items-center box box-border rounded-md min-w-[150px]',
          'text-sm font-medium text-typo-secondary',
          'transition duration-100',
          'bg-button-primary border-button-primary',
          'hover:bg-button-primary-hv hover:border-button-primary-hv',
          'active:bg-button-primary active:border-button-primary',
          'focus:none',
          {
            'bg-button-primary opacity-50 hover:cursor-not-allowed hover:bg-button-primary hover:border-button-primary':
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
