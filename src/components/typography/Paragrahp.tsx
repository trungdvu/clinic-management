import React from 'react';
import classNames from 'classnames';
import { Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';

const { Paragraph: AntParagraph } = Typography;

export const Paragraph: React.FC<ParagraphProps> = ({ children, className, type, ...props }) => {
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
    <AntParagraph className={classNames('font-sans', textColor, className)} {...props}>
      {children}
    </AntParagraph>
  );
};
