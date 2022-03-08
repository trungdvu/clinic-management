import React from 'react';
import classNames from 'classnames';
import { Typography } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';

const { Text: AntText } = Typography;

export const Text: React.FC<TextProps> = ({ children, className, type, ...props }) => {
  const textColor = React.useMemo(() => {
    switch (type) {
      case 'success':
        return 'text-info-suc';
      case 'secondary':
        return 'text-sec';
      case 'warning':
        return 'text-info-war';
      case 'danger':
        return 'text-info-err';
      default:
        return 'text-primary';
    }
  }, [type]);

  return (
    <AntText className={classNames('font-sans', textColor, className)} {...props}>
      {children}
    </AntText>
  );
};
