import { EditOutlined, EnvironmentOutlined, LeftOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col, Image, notification, Row, Tooltip } from 'antd';
import { ConfirmModal, DetailSection, Heading, IconButton, Text } from 'components';
import { SkeletonPatientDetails } from 'components/loadings/SkeletonPatientDetails';
import { PAGE_ROUTES } from 'consts';
import { motion } from 'framer-motion';
import { useTitle } from 'hooks';
import { Patient } from 'interfaces';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { generateFadeInFadeOut } from 'utils';

interface Props extends PropsFromStore {
  title?: string;
}

function PatientDetailPageContainer({
  title,
  loading,
  doDeletePatient,
  doGetPatientDetail,
}: Props) {
  const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);
  const [patientDetails, setPatientsDetails] = useState<Patient>();

  const params = useParams();
  const navigate = useNavigate();

  useTitle(title);

  useEffect(() => {
    if (params.id) {
      doGetPatientDetail(params.id).then((res) => {
        if (res === false) {
          notification.error({
            message: 'Failed',
            description: 'Not found patient details.',
          });
        } else {
          setPatientsDetails(res);
        }
      });
    }
  }, [doGetPatientDetail, params.id]);

  const onClickEdit = useCallback(() => {
    notification.info({
      message: 'In coming feature',
    });
  }, []);

  const onClickDelete = useCallback(() => {
    setIsConfirmDeleteModalVisible(true);
  }, []);

  const onClickOkDelete = useCallback(
    (id: string) => async () => {
      const result = await doDeletePatient(id);
      if (result) {
        notification.success({
          message: 'Deleted',
          description: "You've successfully deleted a patient.",
        });
        setTimeout(() => navigate(PAGE_ROUTES.PATIENTS.PATH), 200);
      } else {
        notification.error({
          message: 'Failed',
          description: "Ops! You can't delete this patient.",
        });
      }
    },
    [doDeletePatient, navigate],
  );

  const onClickCancelDelete = useCallback(() => {
    setIsConfirmDeleteModalVisible(false);
  }, []);

  return (
    <motion.div
      variants={generateFadeInFadeOut()}
      initial="initial"
      animate="animate"
      className="mx-[5%] bg-white px-4 pt-8 pb-20 rounded-md shadow"
    >
      <ConfirmModal
        visible={isConfirmDeleteModalVisible}
        title="Delete patient"
        messages={['This action cannot undo', 'Are you sure?']}
        buttonLeftTitle="Delete"
        buttonRightTitle="Cancel"
        onClickButtonLeft={onClickOkDelete(patientDetails?.id || '')}
        onClickButtonRight={onClickCancelDelete}
      />

      <Link to={PAGE_ROUTES.PATIENTS.PATH} className="flex items-center gap-2">
        <LeftOutlined className="flex items-center text-base" />
        <Text className="text-base select-none">Back to Listing</Text>
      </Link>
      <Heading level={2} className="mt-4">
        Patient Details
      </Heading>

      {loading.doGetPatientDetail ? (
        <SkeletonPatientDetails />
      ) : (
        <>
          {patientDetails ? (
            <>
              <div className="flex">
                <Image
                  src={require('assets/images/default_profile_3.jpeg')}
                  className="w-32 h-32 rounded-md"
                />
                <div className="flex flex-col ml-4">
                  <Heading level={3} className="text-sky-700">
                    {patientDetails.fullName}
                  </Heading>
                  <div className="flex items-center">
                    <PhoneOutlined />
                    <Text className="ml-1 text-base">
                      {patientDetails.phoneNumber || 'Not set'}
                    </Text>
                  </div>
                  <div className="flex items-center">
                    <EnvironmentOutlined />
                    <Text className="ml-1 text-base">{patientDetails.address || 'Not set'}</Text>
                  </div>
                </div>
              </div>

              <Row gutter={24} className="flex items-center mt-10">
                <Col span={12} className="flex flex-col">
                  <Heading level={3} className="mb-0">
                    General Infomation
                  </Heading>
                  <Text type="secondary">General infomation about this Patient</Text>
                </Col>
                <Col span={12} className="flex flex-col">
                  <Tooltip
                    title="Edit general information"
                    placement="bottom"
                    className="text-xs text-center"
                  >
                    <IconButton icon={<EditOutlined />} onClick={onClickEdit} />
                  </Tooltip>
                </Col>
              </Row>

              <Row gutter={24} className="mt-4">
                <Col span={12} className="flex flex-col">
                  <Text type="secondary" className="font-medium">
                    JOINED DATE
                  </Text>
                  <Text>
                    {patientDetails.createdAt
                      ? moment(patientDetails.createdAt).format('D MMM YYYY')
                      : 'Not set'}
                  </Text>
                </Col>
                <Col span={12} className="flex flex-col">
                  <Text type="secondary" className="font-medium">
                    PATIENT TYPE
                  </Text>
                  <Text>Coming soon</Text>
                </Col>
              </Row>

              <Row gutter={24} className="mt-4">
                <Col span={12} className="flex flex-col">
                  <Text type="secondary" className="font-medium">
                    CONTACT NUMBER
                  </Text>
                  <Text>{patientDetails.phoneNumber || 'Not set'}</Text>
                </Col>
                <Col span={12} className="flex flex-col">
                  <Text type="secondary" className="font-medium">
                    DATE OF BIRTH
                  </Text>
                  <Text>
                    {patientDetails.dayOfBirth
                      ? moment(patientDetails.dayOfBirth).format('DD MMM YYYY')
                      : 'Not set'}
                  </Text>
                </Col>
              </Row>

              <Row gutter={24} className="mt-4">
                <Col span={12} className="flex flex-col">
                  <Text type="secondary" className="font-medium">
                    ADDRESS
                  </Text>
                  <Text>{patientDetails.address || 'Not set'}</Text>
                </Col>
                <Col span={12} className="flex flex-col">
                  <Text type="secondary" className="font-medium">
                    GENDER
                  </Text>
                  <Text>{patientDetails.gender || 'Not set'}</Text>
                </Col>
              </Row>

              <DetailSection title="Actions" subTitle="More action on this patient">
                <button
                  className="px-2 py-1 mt-4 transition duration-100 hover:bg-black hover:bg-opacity-5 text-button-primary active:bg-opacity-10"
                  onClick={onClickDelete}
                >
                  Delete this patient
                </button>
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
  loading: state.loading.effects.patientModel,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doDeletePatient: dispatch.patientModel.doDeletePatient,
  doGetPatientDetail: dispatch.patientModel.doGetPatientDetail,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const PatientDetailPage = connect(mapState, mapDispatch)(PatientDetailPageContainer);
