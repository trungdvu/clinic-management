import {
  DownOutlined,
  EditOutlined,
  LeftOutlined,
  UpOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Col, Empty, Form, Image, Input, InputNumber, notification, Row, Tooltip } from 'antd';
import classNames from 'classnames';
import {
  Heading,
  IconButton,
  Paragraph,
  PrimaryButton,
  SkeletonMedicalBillDetails,
  Text,
} from 'components';
import { ConfirmModal } from 'components/modals';
import { PAGE_ROUTES } from 'consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import { MedicalBillDetails } from 'interfaces';
import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { generateFadeInFadeOut } from 'utils';
import { EditableDrugRow } from './EditTableDrugRow';
import { StatusTimeLine } from './StatusTimeLine';

const { useForm, Item } = Form;

interface Props extends PropsFromStore {
  title?: string;
}

function MedicalBillDetailsPageContainer({ title, loading, doGetMedicalBillDetails }: Props) {
  const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);
  const [isMedicationsExpanded, setIsMedicationsExpanded] = useState(false);
  const [medicalBillDetails, setMedicalBillDetails] = useState<MedicalBillDetails>();

  const [addDrugForm] = useForm();
  const params = useParams();

  useTitle(title);

  useEffect(() => {
    doGetMedicalBillDetails(params.id || '').then((res) => {
      if (res === false) {
        notification.error({
          message: 'Failed',
          description: 'Not founded the medical bill details.',
        });
      } else {
        const newDrug: any = {
          name: 'Drug 1',
          quantity: 12,
          usage: '1 pill per day',
          unit: 'pill',
        };

        setMedicalBillDetails({ ...res, drugs: [newDrug] });
      }
    });
  }, [doGetMedicalBillDetails, params]);

  useEffect(() => {
    setIsMedicationsExpanded(false);
  }, [medicalBillDetails]);

  const onClickEditMedicalBill = useCallback(() => {
    notification.info({
      message: 'In coming feature',
    });
  }, []);

  const onClickDelete = useCallback(() => {
    setIsConfirmDeleteModalVisible(true);
  }, []);

  const onClickOkDelete = useCallback(async () => {}, []);

  const onClickCancelDelete = useCallback(() => {
    setIsConfirmDeleteModalVisible(false);
  }, []);

  const toggleExpandedMedications = useCallback(() => {
    if (medicalBillDetails && medicalBillDetails.drugs.length > 4) {
      setIsMedicationsExpanded((pre) => !pre);
    }
  }, [medicalBillDetails]);

  const onClickAddMedication = useCallback(
    (values: any) => {
      const newDrug: any = {
        name: values.drugName,
        quantity: values.drugQuantity,
        usage: values.drugUsage,
        unit: values.drugUnit,
      };
      const medicalBillDetailsUpdated: MedicalBillDetails = {
        ...medicalBillDetails!,
        drugs: [newDrug, ...medicalBillDetails!.drugs],
      };

      setMedicalBillDetails(medicalBillDetailsUpdated);
      addDrugForm.resetFields();
    },
    [medicalBillDetails, addDrugForm],
  );

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
        <LeftOutlined className="text-lg" />
        <Text className="text-base select-none">Back to Listing</Text>
      </Link>
      <Heading level={2} className="mt-4">
        Medical Bill Details
      </Heading>

      {loading.doGetMedicalBillDetails ? (
        <SkeletonMedicalBillDetails />
      ) : (
        <>
          {medicalBillDetails ? (
            <>
              <StatusTimeLine status="pending" />
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
                      <Link to={PAGE_ROUTES.PATIENTS.DETAILS.ID(medicalBillDetails.patientId)}>
                        David Backham
                      </Link>
                    </Col>
                    <Col span={6} className="flex justify-start">
                      <Tooltip
                        title="Edit general information"
                        placement="bottom"
                        className="text-xs text-center"
                      >
                        <IconButton icon={<EditOutlined />} onClick={onClickEditMedicalBill} />
                      </Tooltip>
                    </Col>
                  </Row>
                  <Row gutter={24} align="top" className="mt-4">
                    <Col span={6}>
                      <Text type="secondary" className="font-medium">
                        WHEN
                      </Text>
                    </Col>
                    <Col span={12} className="flex flex-col">
                      <Text className="font-medium">{moment().format('dddd, D MMM YYYY')}</Text>
                      <Text type="secondary">{moment().format('hh:mm A')}</Text>
                    </Col>
                  </Row>
                  <Row gutter={24} align="top" className="mt-4">
                    <Col span={6}>
                      <Text type="secondary" className="font-medium">
                        SYSTOMS
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Paragraph>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe itaque
                        recusandae animi architecto optio, ipsa exercitationem possimus ut ad, sit,
                        nostrum eos? Fugiat, ea ipsum animi eligendi quis nihil nulla?
                      </Paragraph>
                    </Col>
                  </Row>
                  <Row gutter={24} align="top" className="mt-4">
                    <Col span={6}>
                      <Text type="secondary" className="font-medium">
                        PREDICTION
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Paragraph>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe itaque
                        recusandae animi architecto optio, ipsa exercitationem possimus ut ad, sit,
                        nostrum eos? Fugiat, ea ipsum animi eligendi quis nihil nulla?
                      </Paragraph>
                    </Col>
                  </Row>
                  <Row gutter={24} align="top" className="mt-4">
                    <Col span={6}>
                      <Text type="secondary" className="font-medium">
                        ACTUAL RESULT
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Paragraph>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe itaque
                        recusandae animi architecto optio, ipsa exercitationem possimus ut ad, sit,
                        nostrum eos? Fugiat, ea ipsum animi eligendi quis nihil nulla?
                      </Paragraph>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <section className="mt-10">
                <Heading level={3} className="mb-0">
                  Medications
                </Heading>
                <Text type="secondary">Medicines, durgs that for this medical bill.</Text>
                <Form form={addDrugForm} onFinish={onClickAddMedication}>
                  <Row gutter={24} className="px-5 py-3 mt-4">
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
                          placeholder="Description, usage..."
                          className="text-sm h-10"
                        />
                      </Item>
                    </Col>
                    <Col span={3}>
                      <Item rules={[{ required: true }]} name="drugUnit">
                        <Input size="large" placeholder="Pill, pack..." className="text-sm h-10" />
                      </Item>
                    </Col>
                    <Col span={3}>
                      <Item rules={[{ required: true }]} name="drugQuantity">
                        <InputNumber
                          size="large"
                          placeholder="1, 2, 3 .."
                          className="text-sm w-full h-10"
                        />
                      </Item>
                    </Col>
                    <Col span={3}>
                      <Item>
                        <PrimaryButton htmlType="submit">Add</PrimaryButton>
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
                    {_.isEmpty(medicalBillDetails.drugs) ? (
                      <Empty
                        description={
                          <Text className="text-tertiary">
                            Empty. Click <b>Add</b> to attach a medication.
                          </Text>
                        }
                        className="mt-16"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    ) : (
                      <>
                        {_.map(medicalBillDetails.drugs, (drug, index) => (
                          <EditableDrugRow
                            key={index}
                            currentIndex={index}
                            medicalBillId={medicalBillDetails!.id}
                            drug={drug}
                            durgs={medicalBillDetails!.drugs}
                          />
                        ))}
                      </>
                    )}
                  </div>

                  <div
                    className={classNames(
                      'h-16 w-full absolute bottom-0 bg-gradient-to-t from-stone-300 to-transparent',
                      {
                        hidden: isMedicationsExpanded || medicalBillDetails.drugs.length < 5,
                      },
                    )}
                  />
                  <div className="flex items-center w-full absolute bottom-0 transform translate-y-4 z-50">
                    <div className="h-px bg-brd flex-1" />
                    <IconButton
                      disabled={medicalBillDetails.drugs.length < 5}
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
              </section>

              <section className="mt-10">
                <Heading level={3} className="mb-0">
                  Actions and Payments
                </Heading>
                <Text type="secondary">Where you can start or finish this medical bill.</Text>
                <div className="px-5 mt-4">
                  <Row gutter={24} className="py-3">
                    <Col span={5}>
                      <Text>Fee:</Text>
                    </Col>
                    <Col span={5}>$49</Col>
                  </Row>
                  <Row gutter={24} className="py-3">
                    <Col span={5}>
                      <Text>Medications: </Text>
                    </Col>
                    <Col span={5}>$5</Col>
                  </Row>
                  <Row gutter={24} className="py-3">
                    <Col span={5}>
                      <Text>Total: </Text>
                    </Col>
                    <Col span={5}>$5</Col>
                  </Row>
                </div>
                <div className="mt-4">
                  <PrimaryButton>Start medical bill</PrimaryButton>
                </div>
              </section>

              <section className="mt-20">
                <Heading level={3} className="mb-0">
                  Others
                </Heading>
                <Text type="secondary" className="block">
                  More actions on this medical bill.
                </Text>
                <button
                  disabled={medicalBillDetails.status !== 'pending'}
                  className={classNames(
                    'px-2 py-1 mt-4 flex items-center transition-all duration-100 disabled:cursor-default',
                    {
                      'text-button-pri hover:bg-black hover:bg-opacity-5':
                        medicalBillDetails.status === 'pending',
                      'text-yellow-500 hover:bg-transparent':
                        medicalBillDetails.status !== 'pending',
                    },
                  )}
                  onClick={onClickDelete}
                >
                  {medicalBillDetails.status === 'pending' ? (
                    'Delete this medical bill'
                  ) : (
                    <>
                      <WarningOutlined />
                      <Text className="ml-2">Cannot delete this medical bill</Text>
                    </>
                  )}
                </button>
              </section>
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
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const MedicalBillDetailsPage = connect(
  mapState,
  mapDispatch,
)(MedicalBillDetailsPageContainer);
