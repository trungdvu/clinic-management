import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Modal, ModalProps, Spin } from 'antd';
import { RootState } from 'store';
import { ModalHeader } from '../headers';
import { Text } from '../typography';

// if it is too long to sign out, then the modal is closeable
const TIME_TO_CLOSE = 60 * 1000;

const LoadingSignOutModalContainer = ({ loading, onCancel, ...props }: Props) => {
  let timer = useRef<any>().current;

  const [closable, setClosable] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setTimeout(() => setClosable(true), TIME_TO_CLOSE);

    return () => {
      if (!_.isEmpty(timer)) {
        clearTimeout(timer);
      }
    };
  }, []);

  const _onCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>): void | undefined => {
    if (closable && onCancel) {
      onCancel(e);
    }
    return undefined;
  };

  return (
    <Modal
      title={<ModalHeader title="Signing out" />}
      footer={null}
      closable={closable}
      onCancel={_onCancel}
      {...props}
    >
      {closable ? (
        <Text type="danger">There're some error when you sign out, please try later.</Text>
      ) : (
        <div className="flex items-center justify-center w-full py-8">
          <Spin size="large" className="text-button-pri" />
        </div>
      )}
    </Modal>
  );
};

const mapState = (state: RootState) => ({
  loading: state.loading.effects.authModel,
});

type Props = ReturnType<typeof mapState> & ModalProps;

export const LoadingSignOutModal = connect(mapState)(LoadingSignOutModalContainer);
