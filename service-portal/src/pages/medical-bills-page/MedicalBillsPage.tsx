import { DownOutlined, PlusOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons';
import { Col, DatePicker, Empty, notification, Row, Tabs, Tooltip } from 'antd';
import classNames from 'classnames';
import { Heading, IconButton, PrimaryButton, SkeletonListing, Text } from 'components';
import { ConfirmModal } from 'components/modals';
import { PAGE_ROUTES } from 'consts';
import { useTitle } from 'hooks';
import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { NewMedicalBillModal } from './NewMedicalBillModal';
import { Status } from './Status';

interface Props extends PropsFromStore {
  title?: string;
}

const MedicalBillPageContainer = ({
  title,
  loading,
  medicalBillSummaries,
  seletedMedicalBillId,
  setSelectedMedicalbillId,
  doGetMedicalBillSumarries,
  doDeleteMedicalBill,
}: Props) => {
  const [isCreateMedicalBillVisible, setIsCreateMedicalBillVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    doGetMedicalBillSumarries();
  }, [doGetMedicalBillSumarries]);

  useTitle(title);

  const onClickNewMedicalBill = useCallback(() => {
    setIsCreateMedicalBillVisible(true);
  }, []);

  const onCancelNewMedicalBill = useCallback(() => {
    setIsCreateMedicalBillVisible(false);
  }, []);

  const onClickDeleteMedicalBill = useCallback(
    (id: string) => () => {
      setSelectedMedicalbillId(id);
      setIsDeleteModalVisible(true);
    },
    [setSelectedMedicalbillId],
  );

  const onCancelDelete = useCallback(() => {
    setIsDeleteModalVisible(false);
    setSelectedMedicalbillId('');
  }, [setSelectedMedicalbillId]);

  const onOkDelele = useCallback(async () => {
    const result = await doDeleteMedicalBill(seletedMedicalBillId);
    if (result) {
      setIsDeleteModalVisible(false);
      notification.success({
        message: 'Deleted',
        description: 'The patient has been deleted.',
      });
    } else {
      notification.error({
        message: 'Failed',
        description: 'Ops. Something went wrong.',
      });
    }
  }, [doDeleteMedicalBill, seletedMedicalBillId]);

  const onClickBillDate = useCallback(
    (id: string) => () => {
      navigate(PAGE_ROUTES.MEDICAL_BILLS.DETAILS.ID(id));
    },
    [navigate],
  );

  const onClickReload = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <>
      <NewMedicalBillModal visible={isCreateMedicalBillVisible} onCancel={onCancelNewMedicalBill} />
      <ConfirmModal
        title="Delete medical bill"
        messages={['This action cannot undo', 'Are you sure?']}
        buttonLeftTitle="Delete"
        buttonRightTitle="Cancel"
        visible={isDeleteModalVisible}
        onClickButtonLeft={onOkDelele}
        onClickButtonRight={onCancelDelete}
      />

      <div className="flex justify-between">
        <Heading level={3}>Medical bills</Heading>
        <div className="flex items-center gap-5">
          <Tooltip title="Refresh this page" placement="bottom" className="text-xs">
            <IconButton size="large" icon={<ReloadOutlined />} onClick={onClickReload} />
          </Tooltip>
          <PrimaryButton icon={<PlusOutlined />} onClick={onClickNewMedicalBill}>
            New Medical Bill
          </PrimaryButton>
        </div>
      </div>
      {loading.doGetMedicalBillSummaries ? (
        <SkeletonListing />
      ) : (
        <Tabs type="card" defaultActiveKey="1" className="pb-10">
          <Tabs.TabPane key={1} tab="All medical bills">
            <DatePicker.RangePicker
              allowClear={false}
              format={'d MMMM'}
              suffixIcon={<DownOutlined className="text-tertiary" />}
              className="border-none ml-5 mb-5 bg-link bg-opacity-5"
            />
            <Row gutter={24} className="px-5 py-3 text-tertiary font-medium">
              <Col span={4}>BILL DATE</Col>
              <Col span={4}>PATIENT NAME</Col>
              <Col span={10}>SYSTOMS</Col>
              <Col span={4}>STATUS</Col>
              <Col span={2}></Col>
            </Row>
            <div className="h-px bg-brd" />
            {_.isEmpty(medicalBillSummaries) ? (
              <Empty
                description={
                  <Text className="text-tertiary">
                    Empty. Click <b>+ New Medical Bill</b> to create a new one.
                  </Text>
                }
                className="mt-16"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              <>
                {_.map(medicalBillSummaries, (bill, index) => (
                  <Row
                    key={index}
                    gutter={24}
                    className={classNames('flex items-center px-5', {
                      'bg-black bg-opacity-[2.5%]': index % 2 !== 0,
                    })}
                  >
                    <Col
                      span={4}
                      className="flex flex-col cursor-pointer hover:underline py-3"
                      onClick={onClickBillDate(bill.id)}
                    >
                      <Text className="font-semibold">
                        {moment(bill.createdAt).format('ddd D MMM YY')}
                      </Text>
                      <Text>{moment(bill.createdAt).format('H:mm A')}</Text>
                    </Col>
                    <Col
                      span={4}
                      className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                      <UserOutlined className="text-tertiary text-lg pb-1 mr-1" />
                      <Text>{bill.patientFullName}</Text>
                    </Col>
                    <Col span={10} className="whitespace-nowrap text-ellipsis overflow-hidden">
                      <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolores
                        voluptatum recusandae, hic sapiente a voluptates nihil iste in provident
                        esse maiores consequuntur eveniet, deleniti reprehenderit beatae porro
                        aspernatur. Provident!
                      </Text>
                    </Col>
                    <Col span={4}>
                      <Status status={bill.status} />
                    </Col>
                    <Col span={2}>
                      <button
                        disabled={bill.status !== 'pending'}
                        className="px-3 text-center text-button-pri transition-all duration-100 hover:bg-black hover:bg-opacity-5 active:bg-opacity-10 disabled:opacity-50 disabled:hover:no-underline disabled:cursor-not-allowed"
                        onClick={onClickDeleteMedicalBill(bill.id)}
                      >
                        Delete
                      </button>
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane key={2} tab="Pending">
            <Text>tab 2</Text>
          </Tabs.TabPane>
          <Tabs.TabPane key={3} tab="Active">
            <Text>tab 3</Text>
          </Tabs.TabPane>
          <Tabs.TabPane key={4} tab="Completed">
            <Text>tab 4</Text>
          </Tabs.TabPane>
        </Tabs>
      )}
    </>
  );
};

const mapState = (state: RootState) => ({
  medicalBillSummaries: state.medicalBillModel.medicalBillSummaries,
  seletedMedicalBillId: state.medicalBillModel.selectedMedicalBillId,
  loading: state.loading.effects.medicalBillModel,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  setSelectedMedicalbillId: dispatch.medicalBillModel.setSelectedMedicalBillId,
  doGetMedicalBillSumarries: dispatch.medicalBillModel.doGetMedicalBillSummaries,
  doDeleteMedicalBill: dispatch.medicalBillModel.doDeleteMedicalBill,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const MedicalBillPage = connect(mapState, mapDispatch)(MedicalBillPageContainer);
