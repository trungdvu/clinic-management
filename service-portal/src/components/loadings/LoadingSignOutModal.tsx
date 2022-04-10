import { Modal, ModalProps, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store';
import { ModalHeader } from '../headers';
import { Text } from '../typography';

// if it is too long to sign out, then the modal is closeable
const TIME_TO_CLOSE = 60 * 1000;

interface Props extends PropsFromStore, ModalProps {}

function LoadingSignOutModalContainer({ loading, onCancel, ...props }: Props): JSX.Element {
  const [closable, setClosable] = useState<boolean>(false);

  useEffect(() => {
    setClosable(false);
    const timer = setTimeout(() => setClosable(true), TIME_TO_CLOSE);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  function _onCancel(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
    if (closable && onCancel) {
      onCancel(e);
    }
  }

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
}

const mapState = (state: RootState) => ({
  loading: state.loading.effects.authModel,
});

type PropsFromStore = ReturnType<typeof mapState>;

export const LoadingSignOutModal = connect(mapState)(LoadingSignOutModalContainer);
