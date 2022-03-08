import React from 'react';
import classNames from 'classnames';
import { Button, ButtonProps } from 'antd';

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  className,
  style,
  loading,
  ...props
}) => {
  const classes = React.useMemo(
    () =>
      classNames(
        'text-sm border-2 flex items-center font-medium bg-transparent text-button-pri border-button-pri hover:bg-button-sec-hv hover:text-primary-2',
        {
          'border-opacity-30 text-button-pri hover:bg-transparent hover:text-button-pri hover:cursor-not-allowed':
            loading,
        },
        className,
      ),
    [className, loading],
  );

  const styles = React.useMemo(
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
};
