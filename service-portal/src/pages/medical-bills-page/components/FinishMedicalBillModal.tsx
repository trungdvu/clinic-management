import { Modal, notification } from 'antd';
import classNames from 'classnames';
import { ModalHeader, PrimaryButton, SecondaryButton, Text } from 'components';
import { CreatePaymentPayload } from 'interfaces';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RootDispatch } from 'store';
import { formatVND } from 'utils/common-utils';

interface Props {
  medicalBillId: string;
  patientId: string;
  medicalExamCost: number;
  totalDrugCost: number;
  visible?: boolean;
  onClose?: () => void | Promise<void> | undefined;
}

export const FinishMedicalBillModal = ({
  medicalBillId,
  patientId,
  medicalExamCost,
  totalDrugCost,
  visible,
  onClose,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const { medicalBillModel } = useDispatch<RootDispatch>();

  const onClickFinish = useCallback(async () => {
    setLoading(true);

    const payload: CreatePaymentPayload = {
      medicalBillId,
      patientId,
      medicalExamCost,
      totalDrugCost,
    };
    const result = await medicalBillModel.doCreatePayment(payload);

    if (result) {
      await medicalBillModel.doGetMedicalBillDetail(medicalBillId);
      onClose?.();
      notification.success({
        message: 'Created',
        description: 'The medical bill has been finished',
      });
    } else {
      notification.error({
        message: 'Failed',
        description: 'Ops! Something went wrong',
      });
    }

    setLoading(false);
  }, [medicalBillId, medicalBillModel, medicalExamCost, onClose, patientId, totalDrugCost]);

  return (
    <Modal
      visible={visible}
      footer={null}
      title={
        <ModalHeader
          title="Create invoice"
          subTitle="Finish and make a payment for this medical bill"
        />
      }
      className={classNames('p-0 w-[640px]')}
      onCancel={onClose}
    >
      <div>
        <div className="flex items-center justify-between py-3">
          <Text className="text-right w-min">Medications:</Text>
          <Text>{formatVND(totalDrugCost)}</Text>
        </div>
        <div className="flex items-center justify-between py-3">
          <Text className="text-right w-min">Fee:</Text>
          <Text>{formatVND(medicalExamCost)}</Text>
        </div>
        <div className="flex items-center justify-between py-3">
          <Text className="text-right w-min">Total:</Text>
          <Text>{formatVND(totalDrugCost + medicalExamCost)}</Text>
        </div>
      </div>

      <div className="flex items-center w-full gap-5 mt-10">
        <PrimaryButton loading={loading} onClick={onClickFinish}>
          Finish
        </PrimaryButton>
        <SecondaryButton disabled={loading} onClick={onClose}>
          Cancel
        </SecondaryButton>
      </div>
    </Modal>
  );
};
