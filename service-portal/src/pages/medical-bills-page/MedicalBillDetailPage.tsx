import { DownOutlined, LeftOutlined, UpOutlined, WarningOutlined } from '@ant-design/icons';
import { Col, Form, Image, Input, notification, Row, Select } from 'antd';
import classNames from 'classnames';
import {
  ConfirmModal,
  DetailSection,
  EditableParagrahp,
  EditableSelect,
  Heading,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  SkeletonMedicalBillDetails,
  Text,
} from 'components';
import { PAGE_ROUTES } from 'consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import { DiseaseType, MedicalBillDetail, UpdateMedicalBillPayload } from 'interfaces';
import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { generateFadeInFadeOut, regExpNumber } from 'utils';
import {} from '../../components/layouts/DetailSection';
import { EditableDrugRow } from './components/EditTableDrugRow';
import { EmptyDrugs } from './components/EmptyDrug';
import { StatusTimeLine } from './components/StatusTimeLine';
import './styles/MedicalBillDetailPage.css';

const { Option } = Select;

const { useForm, Item } = Form;

interface Props extends PropsFromStore {
  title?: string;
}

function MedicalBillDetailPageContainer({
  title,
  loading,
  doGetMedicalBillDetails,
  doUpdateMedicalBill,
  doDeleteMedicalBill,
  doGetDrugs,
  doGetDiseaseTypes,
}: Props) {
  const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);
  const [isMedicationsExpanded, setIsMedicationsExpanded] = useState(false);
  const [billDetail, setMedicalBillDetail] = useState<MedicalBillDetail>();
  const [diseaseTypes, setDiseaseTypes] = useState<DiseaseType[]>([]);
  const [isStarting, setIsStarting] = useState(false);

  const [addDrugForm] = useForm();
  const params = useParams();
  const navigate = useNavigate();

  useTitle(title);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsMedicationsExpanded(false);
  }, [billDetail]);

  const fetchData = useCallback(async () => {
    const result = await doGetMedicalBillDetails(params.id || '');
    if (result === false) {
      notification.error({
        message: 'Failed',
        description: 'Not founded the medical bill details.',
      });
    } else {
      setMedicalBillDetail(result);

      const diseaseTypes = await doGetDiseaseTypes();
      diseaseTypes === false
        ? notification.error({
            message: 'Failed',
            description: 'Not founded disease type',
          })
        : setDiseaseTypes(diseaseTypes);
    }
  }, [doGetDiseaseTypes, doGetMedicalBillDetails, params.id]);

  const totalPrice = useMemo(() => {
    return _.reduce(
      billDetail?.drugDetails,
      (acc, drug) => {
        return acc + drug.price;
      },
      0,
    );
  }, [billDetail?.drugDetails]);

  const drugsObj = useMemo(() => _.keyBy(diseaseTypes, 'id'), [diseaseTypes]);

  const onClickDelete = useCallback(() => {
    setIsConfirmDeleteModalVisible(true);
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

  const onClickCancelDelete = useCallback(() => {
    setIsConfirmDeleteModalVisible(false);
  }, []);

  const toggleExpandedMedications = useCallback(() => {
    if (billDetail && billDetail.drugDetails.length > 4) {
      setIsMedicationsExpanded((pre) => !pre);
    }
  }, [billDetail]);

  const onClickAddMedication = useCallback(
    (values: any) => {
      addDrugForm.resetFields();
    },
    [addDrugForm],
  );

  const onSavePrediction = useCallback(
    async (text: string) => {
      const oldPrediction = billDetail?.prediction;
      const updatedBillDetail = { ...billDetail, prediction: text } as any;

      setMedicalBillDetail(updatedBillDetail);

      const payload: UpdateMedicalBillPayload = {
        id: params.id!,
        body: { prediction: text },
      };
      const result = await doUpdateMedicalBill(payload);
      if (!result) {
        notification.error({
          message: 'Failed',
          description: 'Ops! Updated the preidction failed',
        });
        // rollback old prediction
        setMedicalBillDetail({ ...billDetail, prediction: oldPrediction } as any);
      }
    },
    [billDetail, doUpdateMedicalBill, params.id],
  );

  const onSaveSymtoms = useCallback(
    async (text: string) => {
      const oldSymptomDescription = billDetail!.symptomDescription;
      const updatedBillDetail = { ...billDetail!, symptomDescription: text };

      setMedicalBillDetail(updatedBillDetail);

      const payload: UpdateMedicalBillPayload = {
        id: params.id!,
        body: { symptomDescription: text },
      };
      const result = await doUpdateMedicalBill(payload);
      if (!result) {
        notification.error({
          message: 'Failed',
          description: 'Ops! Something went wrong',
        });
        setMedicalBillDetail({ ...billDetail!, symptomDescription: oldSymptomDescription });
      }
    },
    [billDetail, doUpdateMedicalBill, params.id],
  );

  const onSaveActualResults = useCallback(
    async (values: string[]) => {
      const oldDiseaseTypeIds = billDetail!.diseaseTypes;
      const updatedBillDetail = {
        ...billDetail!,
        diseaseTypes: _.map(values, (value) => ({
          id: value,
          description: drugsObj[value].description,
        })),
      };

      setMedicalBillDetail(updatedBillDetail);

      const payload: UpdateMedicalBillPayload = {
        id: params.id!,
        body: { diseaseTypeIds: values },
      };

      const result = await doUpdateMedicalBill(payload);
      if (!result) {
        notification.error({
          message: 'Failed',
          description: 'Ops! Something went wrong',
        });
        setMedicalBillDetail({ ...billDetail!, diseaseTypes: oldDiseaseTypeIds });
      }
    },
    [billDetail, doUpdateMedicalBill, drugsObj, params.id],
  );

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
      setMedicalBillDetail({ ...billDetail!, status: 'active' });
    } else {
      notification.error({
        message: 'Failed',
        description: 'Ops! Something went wrong',
      });
    }

    setIsStarting(false);
  }, [billDetail, doUpdateMedicalBill, params.id]);

  return (
    <motion.div
      variants={generateFadeInFadeOut()}
      initial="initial"
      animate="animate"
      className="px-[8%] pb-20"
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

      <Link to={PAGE_ROUTES.MEDICAL_BILLS.PATH} className="flex items-center gap-2">
        <LeftOutlined className="text-base flex items-center" />
        <Text className="text-base select-none">Back to Listing</Text>
      </Link>
      <Heading level={2} className="mt-4">
        Medical Bill Details
      </Heading>

      {loading.doGetMedicalBillDetails ? (
        <SkeletonMedicalBillDetails />
      ) : (
        <>
          {billDetail ? (
            <>
              <StatusTimeLine status={billDetail.status} />
              <Row gutter={24} align="top" className="mt-8">
                <Col span={4}>
                  <Image
                    src={require('assets/images/default_profile_2.png')}
                    className="max-w-[128px] rounded-md"
                    alt="Patient Avatar"
                  />
                </Col>
                <Col span={20}>
                  <Row gutter={24} align="middle">
                    <Col span={6}>
                      <Text type="secondary" className="font-medium">
                        PATIENT
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Link
                        to={PAGE_ROUTES.PATIENTS.DETAILS.ID(billDetail.patient.id)}
                        className="px-3"
                      >
                        {billDetail.patient.fullName}
                      </Link>
                    </Col>
                  </Row>
                  <Row gutter={24} align="top" className="mt-4">
                    <Col span={6}>
                      <Text type="secondary" className="font-medium">
                        WHEN
                      </Text>
                    </Col>
                    <Col span={12} className="flex flex-col">
                      <Text className="font-medium px-3">
                        {moment(billDetail.createdAt).format('dddd, D MMM YYYY')}
                      </Text>
                      <Text type="secondary" className="px-3">
                        {moment(billDetail.createdAt).format('hh:mm A')}
                      </Text>
                    </Col>
                  </Row>
                  <Row gutter={24} align="top" className="mt-4">
                    <Col span={6} className="mt-1">
                      <Text type="secondary" className="font-medium">
                        SYSTOMS
                      </Text>
                    </Col>
                    <Col span={16}>
                      <EditableParagrahp
                        text={billDetail.symptomDescription}
                        onSave={onSaveSymtoms}
                      />
                    </Col>
                  </Row>
                  <Row gutter={24} align="top" className="mt-4">
                    <Col span={6} className="mt-1">
                      <Text type="secondary" className="font-medium">
                        PREDICTION
                      </Text>
                    </Col>
                    <Col span={16}>
                      <EditableParagrahp
                        text={billDetail.prediction}
                        placeholder="Not set"
                        onSave={onSavePrediction}
                      />
                    </Col>
                  </Row>
                  <Row gutter={24} align="top" className="mt-4">
                    <Col span={6} className="mt-1">
                      <Text type="secondary" className="font-medium">
                        ACTUAL RESULTS
                      </Text>
                    </Col>
                    <Col span={16}>
                      <EditableSelect
                        value={_.map(billDetail.diseaseTypes, (d) => d.id)}
                        showSearch={false}
                        mode="multiple"
                        size="large"
                        placeholder="Select diseases"
                        className="w-full select-disease"
                        onSave={onSaveActualResults}
                      >
                        {_.map(diseaseTypes, (d) => (
                          <Option key={d.id}>
                            <Text className="text-sm">{d.description}</Text>
                          </Option>
                        ))}
                      </EditableSelect>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <DetailSection
                title="Medications"
                subTitle="Medicines, durgs that for this medical bill.l"
              >
                <Form
                  form={addDrugForm}
                  onFinish={onClickAddMedication}
                  className="bg-black bg-opacity-5 pr-7 py-2 mt-4"
                >
                  <Row gutter={24} className="px-5 py-3">
                    <Col span={1}></Col>
                    <Col span={5}>
                      <Item rules={[{ required: true }]} name="drugName">
                        <Input
                          size="large"
                          placeholder="Medication name"
                          className="text-sm h-10"
                        />
                      </Item>
                    </Col>
                    <Col span={7}>
                      <Item rules={[{ required: true }]} name="drugUsage">
                        <Input
                          size="large"
                          placeholder="Description, usage"
                          className="text-sm h-10"
                        />
                      </Item>
                    </Col>
                    <Col span={3}>
                      <Item rules={[{ required: true }]} name="drugUnit">
                        <Input size="large" placeholder="Pill, pack" className="text-sm h-10" />
                      </Item>
                    </Col>
                    <Col span={3}>
                      <Item rules={[{ required: true, pattern: regExpNumber }]} name="drugQuantity">
                        <Input size="large" placeholder="1, 2, 3" className="text-sm w-full h-10" />
                      </Item>
                    </Col>
                    <Col span={3}>
                      <Item>
                        <PrimaryButton htmlType="submit" className="px-10">
                          Add
                        </PrimaryButton>
                      </Item>
                    </Col>
                  </Row>
                </Form>
                <div className="relative mb-10">
                  <Row gutter={24} className="px-5 py-3 text-tertiary font-medium">
                    <Col span={1}>
                      <Text className="whitespace-nowrap">NO</Text>
                    </Col>
                    <Col span={5} className="pl-6">
                      NAME
                    </Col>
                    <Col span={7} className="pl-9">
                      USAGE
                    </Col>
                    <Col span={3} className="pl-8">
                      UNIT
                    </Col>
                    <Col span={3} className="pl-8">
                      QUANTITY
                    </Col>
                    <Col span={3} className="pl-6 text-right">
                      AMOUNT
                    </Col>
                  </Row>
                  <div className="h-px bg-brd" />

                  <div
                    className={classNames('overflow-hidden px-5', {
                      'h-auto pb-8': isMedicationsExpanded,
                      'h-[210px]': !isMedicationsExpanded,
                    })}
                  >
                    {_.isEmpty(billDetail.drugDetails) ? (
                      <EmptyDrugs />
                    ) : (
                      <>
                        {_.map(billDetail.drugDetails, (drug, index) => (
                          <EditableDrugRow
                            key={index}
                            currentIndex={index}
                            medicalBillId={billDetail!.id}
                            medicalBillDrug={drug}
                            medicalBillDurgs={billDetail!.drugDetails}
                          />
                        ))}
                      </>
                    )}
                  </div>

                  <div
                    className={classNames(
                      'h-16 w-full absolute bottom-0 bg-gradient-to-t from-stone-300 to-transparent',
                      {
                        hidden: isMedicationsExpanded || billDetail.drugDetails.length < 5,
                      },
                    )}
                  />
                  <div className="flex items-center w-full absolute bottom-0 transform translate-y-4 z-50">
                    <div className="h-px bg-brd flex-1" />
                    <IconButton
                      disabled={billDetail.drugDetails.length < 5}
                      icon={
                        isMedicationsExpanded ? (
                          <UpOutlined className="text-sm" />
                        ) : (
                          <DownOutlined className="text-sm " />
                        )
                      }
                      onClick={toggleExpandedMedications}
                    />
                    <div className="h-px bg-brd flex-1" />
                  </div>
                </div>
              </DetailSection>

              <DetailSection
                title="Actions and Payments"
                subTitle="Where you can start or finish this medical bill."
              >
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
                <div className="flex items-center gap-4 mt-4 bg-opacity-5 bg-black py-5 px-5">
                  <PrimaryButton className="px-10" onClick={onClickStart} loading={isStarting}>
                    {billDetail.status === 'pending' ? 'Start' : 'Finish'}
                  </PrimaryButton>
                  <SecondaryButton
                    disabled={billDetail.status !== 'pending'}
                    className={'flex items-center disabled:cursor-not-allowed'}
                    onClick={onClickDelete}
                  >
                    {billDetail.status === 'pending' ? (
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
            </>
          ) : (
            <Text type="danger" className="text-base">
              Not founded.
            </Text>
          )}
        </>
      )}
    </motion.div>
  );
}

const mapState = (state: RootState) => ({
  loading: state.loading.effects.medicalBillModel,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doGetMedicalBillDetails: dispatch.medicalBillModel.doGetMedicalBillDetails,
  doUpdateMedicalBill: dispatch.medicalBillModel.doUpdateMedicalBill,
  doDeleteMedicalBill: dispatch.medicalBillModel.doDeleteMedicalBill,
  doGetDrugs: dispatch.drugModel.doGetDrugs,
  doGetDiseaseTypes: dispatch.diseaseTypeModel.doGetDiseaseTypes,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const MedicalBillDetailPage = connect(mapState, mapDispatch)(MedicalBillDetailPageContainer);
