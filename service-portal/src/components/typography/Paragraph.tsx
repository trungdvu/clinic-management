import { Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import classNames from 'classnames';
import React, { memo } from 'react';

const { Paragraph: AntParagraph } = Typography;

export const Paragraph: React.FC<ParagraphProps> = memo(
  ({ children, className, type = 'primary', ...props }): JSX.Element => {
    const colors: any = {
      success: 'text-typo-success',
      secondary: 'text-sec',
      warning: 'text-typo-warning',
      danger: 'text-typo-error',
      primary: 'text-typo-primary',
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
