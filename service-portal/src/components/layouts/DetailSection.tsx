import classNames from 'classnames';
import { Heading, Text } from 'components';
import React, { memo } from 'react';

interface Props {
  className?: string;
  title: string;
  subTitle?: string;
}

export const DetailSection: React.FC<Props> = memo(({ className, title, subTitle, children }) => {
  return (
    <section className={classNames('mt-10', className)}>
      <Heading level={3} className="mb-0">
        {title}
      </Heading>
      {subTitle && (
        <Text type="secondary" className="block">
          {subTitle}
        </Text>
      )}

      {children}
    </section>
  );
});
