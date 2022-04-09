import { Heading, Text } from '../typography';
import { memo } from 'react';

interface Props {
  title?: string;
  subTitle?: string;
}

export const ModalHeader = memo(({ title, subTitle }: Props): JSX.Element => {
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
