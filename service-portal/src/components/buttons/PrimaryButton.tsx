import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import { Button, ButtonProps } from 'antd';

export const PrimaryButton: React.FC<ButtonProps> = memo(
  ({ children, className, style, loading, ...props }) => {
    const classes = useMemo(
      () =>
        classNames(
          'flex justify-center items-center box box-border',
          'text-sm font-medium text-primary-2',
          'transition duration-100',
          'bg-button-pri',
          'hover:bg-button-pri-hv hover:border-button-pri-hv',
          'active:bg-button-pri active:border-button-pri',
          'focus:bg-button-pri focus:border-button-pri',
          {
            'bg-button-pri opacity-50 hover:cursor-not-allowed hover:bg-button-pri': loading,
          },
          className,
        ),
      [className, loading],
    );

    const styles = useMemo(
      () => ({
        minWidth: '150px',
        ...style,
      }),
      [style],
    );

    return (
      <Button
        shape="round"
        size="large"
        loading={loading}
        className={classes}
        style={styles}
        {...props}
      >
        {children}
      </Button>
    );
  },
);
