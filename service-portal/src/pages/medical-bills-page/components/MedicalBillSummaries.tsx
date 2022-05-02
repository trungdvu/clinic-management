import { Col, Divider, Empty, notification, Row, Spin } from 'antd';
import { ConfirmModal, Text } from 'components';
import { PAGE_ROUTES } from 'consts';
import _ from 'lodash';
import { memo, useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { MedicalBillSummary } from './MedicalBillSummary';

interface Props extends PropsFromStore {}

const MedicalBillSummariesContainer = ({
  medicalBillSummaries,
  selectedMedicalBillId,
  allMedicalBillSummariesHasMore,
  setSelectedMedicalBillId,
  doDeleteMedicalBill,
  doGetMoreMedicalBillSummaries,
}: Props) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const navigate = useNavigate();

  const onClickBillDate = useCallback(
    (id: string) => () => {
      navigate(PAGE_ROUTES.MEDICAL_BILLS.DETAILS.ID(id));
    },
    [navigate],
  );

  const onClickDeleteMedicalBill = useCallback(
    (id: string) => () => {
      setSelectedMedicalBillId(id);
      setIsDeleteModalVisible(true);
    },
    [setSelectedMedicalBillId],
  );

  const onCancelDelete = useCallback(() => {
    setIsDeleteModalVisible(false);
    setSelectedMedicalBillId('');
  }, [setSelectedMedicalBillId]);

  const onOkDelete = useCallback(async () => {
    const result = await doDeleteMedicalBill(selectedMedicalBillId);
    if (result) {
      setIsDeleteModalVisible(false);
      notification.success({
        message: 'Deleted',
        description: 'The medical bill has been deleted.',
      });
    } else {
      notification.error({
        message: 'Failed',
        description: 'Ops, Something went wrong.',
      });
    }
  }, [doDeleteMedicalBill, selectedMedicalBillId]);

  const _doGetMoreMedicalBillSummaries = useCallback(async () => {
    if (isLoadingMore) {
      return;
    }
    setIsLoadingMore(true);
    await doGetMoreMedicalBillSummaries({});
    setIsLoadingMore(false);
  }, [doGetMoreMedicalBillSummaries, isLoadingMore]);

  return (
    <>
      <ConfirmModal
        title="Delete medical bill"
        messages={['This action cannot undo', 'Are you sure?']}
        buttonLeftTitle="Delete"
        buttonRightTitle="Cancel"
        visible={isDeleteModalVisible}
        onClickButtonLeft={onOkDelete}
        onClickButtonRight={onCancelDelete}
      />

      <Row gutter={24} className="px-5 py-3 font-medium text-typo-tertiary">
        <Col span={3}>BILL DATE</Col>
        <Col span={5}>PATIENT NAME</Col>
        <Col span={10}>SYSTOMS</Col>
        <Col span={4}>STATUS</Col>
        <Col span={2}></Col>
      </Row>

      {_.isEmpty(medicalBillSummaries) ? (
        <Empty
          description={
            <Text className="text-typo-tertiary">
              No medical bills. Click <b>+ New Medical Bill</b> to create a new one.
            </Text>
          }
          className="mt-16"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <InfiniteScroll
          dataLength={medicalBillSummaries.length}
          hasMore={allMedicalBillSummariesHasMore}
          scrollThreshold="50px"
          loader={
            <div className="flex items-center justify-center py-3 mt-3">
              <Spin size="large" />
            </div>
          }
          endMessage={
            <Divider plain className="pt-3">
              <Text type="secondary">No more</Text>
            </Divider>
          }
          next={_doGetMoreMedicalBillSummaries}
        >
          {_.map(medicalBillSummaries, (bill, index) => (
            <MedicalBillSummary
              key={index}
              index={index}
              onDelete={onClickDeleteMedicalBill(bill.id)}
              onClick={onClickBillDate(bill.id)}
              billSummary={bill}
            />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

const mapState = (state: RootState) => ({
  medicalBillSummaries: state.medicalBillModel.medicalBillSummaries,
  selectedMedicalBillId: state.medicalBillModel.selectedMedicalBillId,
  allMedicalBillSummariesHasMore: state.medicalBillModel.allMedicalBillSummariesHasMore,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  setSelectedMedicalBillId: dispatch.medicalBillModel.setSelectedMedicalBillId,
  doGetMoreMedicalBillSummaries: dispatch.medicalBillModel.doGetMoreMedicalBillSummaries,
  doDeleteMedicalBill: dispatch.medicalBillModel.doDeleteMedicalBill,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const MedicalBillSummaries = connect(
  mapState,
  mapDispatch,
)(memo(MedicalBillSummariesContainer));
