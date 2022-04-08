import { Heading, Text } from '../typography';
import React from 'react';

interface ModalHeaderProps {
  title?: string;
  subTitle?: string;
}

export const ModalHeader = React.memo(({ title, subTitle }: ModalHeaderProps) => {
  return (
    <>
      <div>
        <Heading level={3} className="mb-0">
          {title}
        </Heading>
        <Text className="text-tertiary">{subTitle}</Text>
      </div>
    </>
  );
});
