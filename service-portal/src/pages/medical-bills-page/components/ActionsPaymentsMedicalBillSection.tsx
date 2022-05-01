import { WarningOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { ConfirmModal, DetailSection, PrimaryButton, SecondaryButton, Text } from 'components';
import { PAGE_ROUTES } from 'consts';
import _ from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { sleep } from 'utils/async-utils';
import { formatVND } from 'utils/common-utils';
import { FinishMedicalBillModal } from './FinishMedicalBillModal';

interface Props extends PropsFromStore {}

const ActionsPaymentsMedicalBillSectionContainer = ({
  selectedMedicalBillDetail,
  setSelectedMedicalBillDetail,
  doUpdateMedicalBill,
  doDeleteMedicalBill,
}: Props) => {
  const [isStarting, setIsStarting] = useState(false);
  const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);
  const [isFinishMedicalBillModalVisible, setIsFinishMedicalBillModalVisible] = useState(false);

  const { drugDetails, status, id, patient } = selectedMedicalBillDetail;
  const feeCost = 159000;

  const params = useParams();
  const navigate = useNavigate();

  const medicationCost = useMemo(
    () => _.reduce(drugDetails, (acc, drug) => acc + drug.price, 0),
    [drugDetails],
  );

  const totalCost = useMemo(() => medicationCost + feeCost, [medicationCost]);

  const onClickDelete = useCallback(() => {
    setIsConfirmDeleteModalVisible(true);
  }, []);

  const onClickCancelDelete = useCallback(() => {
    setIsConfirmDeleteModalVisible(false);
  }, []);

  const onClickOkDelete = useCallback(async () => {
    const result = await doDeleteMedicalBill(params.id!);
    if (result) {
      notification.success({
        message: 'Deleted',
        description: "You've successfully deleted a medical bill",
      });
      setTimeout(() => navigate(PAGE_ROUTES.MEDICAL_BILLS.PATH), 200);
    } else {
      notification.error({
        message: 'Failed',
        description: "Can't delete this medical bill",
      });
    }
  }, [doDeleteMedicalBill, navigate, params.id]);

  const onClickStart = useCallback(async () => {
    setIsStarting(true);

    const result = await doUpdateMedicalBill({
      id: params.id!,
      body: {
        status: 'active',
      },
    });
    if (result) {
      notification.success({
        message: 'Started',
        description: 'The medical bill has been started',
      });
      setSelectedMedicalBillDetail({ ...selectedMedicalBillDetail, status: 'active' });
    } else {
      notification.error({
        message: 'Failed',
        description: 'Ops! Something went wrong',
      });
    }

    setIsStarting(false);
  }, [doUpdateMedicalBill, params.id, selectedMedicalBillDetail, setSelectedMedicalBillDetail]);

  const onClickFinish = useCallback(async () => {
    setIsFinishMedicalBillModalVisible(true);
    await sleep(3000);
  }, []);

  const onCloseFinish = useCallback(() => {
    setIsFinishMedicalBillModalVisible(false);
  }, []);

  return (
    <DetailSection
      title="Actions and Payments"
      subTitle="Where you can start or finish this medical bill."
    >
      <ConfirmModal
        visible={isConfirmDeleteModalVisible}
        title="Delete this medical bill"
        messages={['This action cannot undo', 'Are you sure?']}
        buttonLeftTitle="Delete"
        buttonRightTitle="Cancel"
        onClickButtonLeft={onClickOkDelete}
        onClickButtonRight={onClickCancelDelete}
      />

      <FinishMedicalBillModal
        visible={isFinishMedicalBillModalVisible}
        medicalBillId={id}
        medicalExamCost={feeCost}
        patientId={patient.id}
        totalDrugCost={medicationCost}
        onClose={onCloseFinish}
      />

      <div className="px-5 mt-4 bg-gradient-to-r from-line-secondary via-gray-100 to-gray-50 w-80">
        <div className="flex items-center justify-between py-3">
          <Text className="text-right w-min">Medications:</Text>
          <Text>{formatVND(medicationCost)}</Text>
        </div>
        <div className="flex items-center justify-between py-3">
          <Text className="text-right w-min">Fee:</Text>
          <Text>{formatVND(feeCost)}</Text>
        </div>
        <div className="flex items-center justify-between py-3">
          <Text className="text-right w-min">Total:</Text>
          <Text>{formatVND(totalCost)}</Text>
        </div>
      </div>

      <div className="flex items-center gap-4 px-5 py-5 mt-4 bg-gradient-to-r from-line-secondary via-gray-100 to-gray-50">
        {status === 'pending' ? (
          <PrimaryButton className="px-10" onClick={onClickStart} loading={isStarting}>
            Start
          </PrimaryButton>
        ) : status === 'active' ? (
          <PrimaryButton className="px-10" onClick={onClickFinish}>
            Finish
          </PrimaryButton>
        ) : (
          <PrimaryButton disabled className="px-10">
            Finished
          </PrimaryButton>
        )}

        <SecondaryButton
          disabled={status !== 'pending'}
          className={'flex items-center disabled:cursor-not-allowed'}
          onClick={onClickDelete}
        >
          {status === 'pending' ? (
            <Text>Delete This Medical Bill</Text>
          ) : (
            <>
              <WarningOutlined className="flex items-center justify-center" />
              <Text className="ml-2">Cannot Delete This Medical Bill</Text>
            </>
          )}
        </SecondaryButton>
      </div>
    </DetailSection>
  );
};

const mapState = (state: RootState) => ({
  selectedMedicalBillDetail: state.medicalBillModel.selectedMedicalBillDetail!,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  setSelectedMedicalBillDetail: dispatch.medicalBillModel.setSelectedMedicalBillDetail,
  doUpdateMedicalBill: dispatch.medicalBillModel.doUpdateMedicalBill,
  doDeleteMedicalBill: dispatch.medicalBillModel.doDeleteMedicalBill,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const ActionsPaymentsMedicalBillSection = connect(
  mapState,
  mapDispatch,
)(ActionsPaymentsMedicalBillSectionContainer);
