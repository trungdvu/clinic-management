import { WarningOutlined } from '@ant-design/icons';
import { Col, notification, Row } from 'antd';
import { ConfirmModal, DetailSection, PrimaryButton, SecondaryButton, Text } from 'components';
import { PAGE_ROUTES } from 'consts';
import _ from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';

interface Props extends PropsFromStore {}

const ActionsPaymentsMedicalBillSectionContainer = ({
  selectedMedicalBillDetail,
  setSelectedMedicalBillDetail,
  doUpdateMedicalBill,
  doDeleteMedicalBill,
}: Props) => {
  const [isStarting, setIsStarting] = useState(false);
  const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const totalPrice = useMemo(
    () => _.reduce(selectedMedicalBillDetail?.drugDetails, (acc, drug) => acc + drug.price, 0),
    [selectedMedicalBillDetail?.drugDetails],
  );

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
      setSelectedMedicalBillDetail({ ...selectedMedicalBillDetail!, status: 'active' });
    } else {
      notification.error({
        message: 'Failed',
        description: 'Ops! Something went wrong',
      });
    }

    setIsStarting(false);
  }, [doUpdateMedicalBill, params.id, selectedMedicalBillDetail, setSelectedMedicalBillDetail]);

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
      <div className="px-5 mt-4">
        <Row gutter={24} className="py-3">
          <Col span={5}>
            <Text>Fee:</Text>
          </Col>
          <Col span={5}>$0</Col>
        </Row>
        <Row gutter={24} className="py-3">
          <Col span={5}>
            <Text>Medications:</Text>
          </Col>
          <Col span={5}>${totalPrice}</Col>
        </Row>
        <Row gutter={24} className="py-3">
          <Col span={5}>
            <Text>Total:</Text>
          </Col>
          <Col span={5}>${totalPrice}</Col>
        </Row>
      </div>
      <div className="flex items-center gap-4 px-5 py-5 mt-4 bg-gradient-to-r from-line-secondary via-gray-100 to-gray-50">
        <PrimaryButton className="px-10" onClick={onClickStart} loading={isStarting}>
          {selectedMedicalBillDetail.status === 'pending' ? 'Start' : 'Finish'}
        </PrimaryButton>
        <SecondaryButton
          disabled={selectedMedicalBillDetail.status !== 'pending'}
          className={'flex items-center disabled:cursor-not-allowed'}
          onClick={onClickDelete}
        >
          {selectedMedicalBillDetail.status === 'pending' ? (
            <Text>Delete This Medical Bill</Text>
          ) : (
            <>
              <WarningOutlined className="flex items-center justify-center" />
              <Text className="ml-2">Cannot delete this medical bill</Text>
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
