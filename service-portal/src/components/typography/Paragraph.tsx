import { Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import classNames from 'classnames';
import React, { memo } from 'react';

const { Paragraph: AntParagraph } = Typography;

export const Paragraph: React.FC<ParagraphProps> = memo(
  ({ children, className, type = 'primary', ...props }): JSX.Element => {
    const colors: any = {
      success: 'text-info-suc',
      secondary: 'text-sec',
      warning: 'text-info-war',
      danger: 'text-info-err',
      primary: 'text-primary',
    };

    return (
      <AntParagraph
        className={classNames('font-sans text-inherit', colors[type], className)}
        {...props}
      >
        {children}
      </AntParagraph>
    );
  },
);
