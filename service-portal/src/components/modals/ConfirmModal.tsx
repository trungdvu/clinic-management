import { Modal } from 'antd';
import classNames from 'classnames';
import { PrimaryButton, SecondaryButton } from 'components/buttons';
import { ModalHeader } from 'components/headers';
import { Text } from 'components/typography';
import _ from 'lodash';
import { memo } from 'react';

interface Props {
  visible?: boolean;
  title: string;
  subTitle?: string;
  messages: string[];
  buttonLeftTitle?: string;
  buttonRightTitle?: string;
  buttonLeft?: () => void;
  buttonRight?: () => void;
}

export const ConfirmModal = memo(
  ({
    visible,
    title,
    subTitle,
    messages,
    buttonLeftTitle = 'Ok',
    buttonRightTitle = 'Cancel',
    buttonLeft,
    buttonRight,
  }: Props) => {
    return (
      <Modal
        visible={visible}
        footer={null}
        title={<ModalHeader title={title} subTitle={subTitle} />}
        className={classNames('p-0 w-[560px]')}
        onCancel={buttonRight}
      >
        <div className="flex flex-col gap-2 text-base">
          {_.map(messages, (message) => (
            <Text>{message}</Text>
          ))}
        </div>

        <div className="flex items-center w-full mt-10 gap-5">
          <PrimaryButton onClick={buttonLeft}>{buttonLeftTitle}</PrimaryButton>
          <SecondaryButton onClick={buttonRight}>{buttonRightTitle}</SecondaryButton>
        </div>
      </Modal>
    );
  },
);
