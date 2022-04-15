import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import { Button, ButtonProps } from 'antd';

export const SecondaryButton: React.FC<ButtonProps> = memo(
  ({ children, className, style, loading, ...props }): JSX.Element => {
    const classes = useMemo(
      () =>
        classNames(
          'flex items-center justify-center',
          'bg-transparent',
          'transition duration-100',
          'border-2 border-button-pri',
          'text-sm text-button-pri font-medium',
          'hover:border-button-pri-hv hover:text-button-pri-hv',
          'active:bg-transparent active:text-button-pri active:border-button-pri',
          'disabled:text-button-pri disabled:border-button-pri disabled:opacity-50',
          {
            'border-opacity-30 text-button-pri hover:bg-transparent hover:text-button-pri hover:cursor-not-allowed':
              loading,
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
