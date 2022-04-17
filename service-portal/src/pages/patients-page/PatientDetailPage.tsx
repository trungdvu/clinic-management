import { EditOutlined, EnvironmentOutlined, LeftOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col, Image, notification, Row } from 'antd';
import { Heading, PrimaryButton, Text } from 'components';
import { SkeletonPatientDetails } from 'components/loadings/SkeletonPatientDetails';
import { ConfirmModal } from 'components/modals';
import { PAGE_ROUTES } from 'consts';
import { useTitle } from 'hooks';
import { PatientDetails } from 'interfaces';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';

interface Props extends PropsFromStore {
  title?: string;
}

function PatientDetailsPageContainer({
  title,
  loading,
  doDeletePatient,
  doGetPatientDetails,
}: Props) {
  const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);
  const [patientDetails, setPatientsDetails] = useState<PatientDetails>();

  const params = useParams();
  const navigate = useNavigate();

  useTitle(title);

  useEffect(() => {
    if (params.id) {
      doGetPatientDetails(params.id).then((res) => {
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
  }, [doGetPatientDetails, params.id]);

  const onPressEditInfomation = useCallback(() => {
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
    <div className="px-[8%]">
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
        <LeftOutlined className="text-lg" />
        <Text className="text-base select-none">Back to Listing</Text>
      </Link>
      <Heading level={2} className="mt-4">
        Patient Details
      </Heading>

      {loading.doGetPatientDetails ? (
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
                <div className="ml-4 flex flex-col">
                  <Heading level={3} className="text-sky-700">
                    {patientDetails.fullName}
                  </Heading>
                  <div className="flex items-center">
                    <PhoneOutlined />
                    <Text className="text-base ml-1">
                      {patientDetails.phoneNumber || 'Not set'}
                    </Text>
                  </div>
                  <div className="flex items-center">
                    <EnvironmentOutlined />
                    <Text className="text-base ml-1">{patientDetails.address || 'Not set'}</Text>
                  </div>
                </div>
              </div>

              <div className="flex items-baseline justify-between w-full mt-10">
                <div className="flex-1 mr-5">
                  <Heading level={3} className="mb-0">
                    General Infomation
                  </Heading>
                  <Text type="secondary">General infomation about this Patient</Text>
                </div>
                <PrimaryButton
                  size="middle"
                  icon={<EditOutlined />}
                  onClick={onPressEditInfomation}
                >
                  Edit Infomation
                </PrimaryButton>
              </div>

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

              <div className="flex items-baseline justify-between w-full mt-10">
                <div className="flex-1 mr-5">
                  <Heading level={3} className="mb-0">
                    Others
                  </Heading>
                  <Text type="secondary" className="block">
                    More action on this patient.
                  </Text>
                  <button
                    className="mt-4 px-2 py-1 transition duration-100 hover:bg-black hover:bg-opacity-5 text-button-pri active:bg-opacity-10"
                    onClick={onClickDelete}
                  >
                    Delete this patient
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Text type="danger" className="text-base">
              Not founded.
            </Text>
          )}
        </>
      )}
    </div>
  );
}

const mapState = (state: RootState) => ({
  selectedPatient: state.patientModel.selectedPatient,
  loading: state.loading.effects.patientModel,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doDeletePatient: dispatch.patientModel.doDeletePatient,
  doGetPatientDetails: dispatch.patientModel.doGetPatientDetails,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const PatientDetailsPage = connect(mapState, mapDispatch)(PatientDetailsPageContainer);
