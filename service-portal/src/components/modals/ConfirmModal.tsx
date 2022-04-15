import { Modal } from 'antd';
import classNames from 'classnames';
import { PrimaryButton, SecondaryButton } from 'components/buttons';
import { ModalHeader } from 'components/headers';
import { Text } from 'components/typography';
import _ from 'lodash';
import { memo, useCallback, useState } from 'react';

interface Props {
  visible?: boolean;
  title: string;
  subTitle?: string;
  messages: string[];
  buttonLeftTitle?: string;
  buttonRightTitle?: string;
  onClickButtonLeft?: () => Promise<void> | void;
  onClickButtonRight?: () => void;
}

export const ConfirmModal = memo(
  ({
    visible,
    title,
    subTitle,
    messages,
    buttonLeftTitle = 'Ok',
    buttonRightTitle = 'Cancel',
    onClickButtonLeft,
    onClickButtonRight,
  }: Props) => {
    const [loading, setLoading] = useState(false);

    const _onClickButtonLeft = useCallback(async () => {
      setLoading(true);
      await onClickButtonLeft?.();
      setLoading(false);
    }, [onClickButtonLeft]);

    return (
      <Modal
        visible={visible}
        closable={!loading}
        footer={null}
        title={<ModalHeader title={title} subTitle={subTitle} />}
        className={classNames('p-0 w-[560px]')}
        onCancel={onClickButtonRight}
      >
        <div className="flex flex-col gap-2 text-base">
          {_.map(messages, (message, index) => (
            <Text key={index}>{message}</Text>
          ))}
        </div>

        <div className="flex items-center w-full mt-10 gap-5">
          <PrimaryButton loading={loading} onClick={_onClickButtonLeft}>
            {buttonLeftTitle}
          </PrimaryButton>
          <SecondaryButton disabled={loading} onClick={onClickButtonRight}>
            {buttonRightTitle}
          </SecondaryButton>
        </div>
      </Modal>
    );
  },
);
