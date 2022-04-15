import { EditOutlined, EnvironmentOutlined, LeftOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col, Image, notification, Row } from 'antd';
import { Heading, PrimaryButton, Text } from 'components';
import { ConfirmModal } from 'components/modals';
import { PAGE_ROUTES } from 'consts';
import { useTitle } from 'hooks';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';

interface Props extends PropsFromStore {
  title?: string;
}

function PatientDetailsPageContainer({ title, selectedPatient, doDeletePatient }: Props) {
  const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);
  const navigate = useNavigate();

  const { fullName, address, phoneNumber, gender, dayOfBirth, id } = selectedPatient;

  useTitle(title);

  const onPressEditInfomation = useCallback(() => {
    console.log('In coming feature');
  }, []);

  const onClickDelete = useCallback(() => {
    setIsConfirmDeleteModalVisible(true);
  }, []);

  const onClickOkDelete = useCallback(async () => {
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
  }, [doDeletePatient, id, navigate]);

  const onClickCancelDelete = useCallback(() => {
    setIsConfirmDeleteModalVisible(false);
  }, []);

  return (
    <div className="px-[8%]">
      <Link to={PAGE_ROUTES.PATIENTS.PATH} className="flex items-center gap-2">
        <LeftOutlined className="text-lg" />
        <Text className="text-base select-none">Back to Listing</Text>
      </Link>

      <Heading level={2} className="mt-4">
        Patient Details
      </Heading>

      <div>
        <div className="flex">
          <Image
            src={require('assets/images/default_profile.jpg')}
            preview={false}
            className="w-32 h-32 rounded-md"
          />
          <div className="ml-4 flex flex-col justify-end">
            <Heading level={3} className="text-sky-700">
              {fullName}
            </Heading>
            <div className="flex items-center">
              <PhoneOutlined />
              <Text className="text-base ml-1">{phoneNumber || 'Not set'}</Text>
            </div>
            <div className="flex items-center">
              <EnvironmentOutlined />
              <Text className="text-base ml-1">{address || 'Not set'}</Text>
            </div>
          </div>
        </div>

        <div className="flex items-baseline justify-between w-full mt-10">
          <div className="flex-1 mr-5">
            <div className="h-0.5 w-16 bg-brd rounded-full" />
            <Heading level={3} className="mt-2 mb-0">
              General Infomation
            </Heading>
            <Text type="secondary">General infomation about this Patient</Text>
          </div>
          <PrimaryButton size="middle" icon={<EditOutlined />} onClick={onPressEditInfomation}>
            Edit Infomation
          </PrimaryButton>
        </div>

        <Row gutter={24} className="mt-4">
          <Col span={12} className="flex flex-col">
            <Text type="secondary">START DATE</Text>
            <Text>Not set</Text>
          </Col>
          <Col span={12} className="flex flex-col">
            <Text type="secondary">PATIENT TYPE</Text>
            <Text>Not set</Text>
          </Col>
        </Row>

        <Row gutter={24} className="mt-4">
          <Col span={12} className="flex flex-col">
            <Text type="secondary">CONTACT NUMBER</Text>
            <Text>{phoneNumber || 'Not set'}</Text>
          </Col>
          <Col span={12} className="flex flex-col">
            <Text type="secondary">DATE OF BIRTH</Text>
            <Text>{dayOfBirth ? moment(dayOfBirth).format('DD MMM YYYY') : 'Not set'}</Text>
          </Col>
        </Row>

        <Row gutter={24} className="mt-4">
          <Col span={12} className="flex flex-col">
            <Text type="secondary">ADDRESS</Text>
            <Text>{address || 'Not set'}</Text>
          </Col>
          <Col span={12} className="flex flex-col">
            <Text type="secondary">GENDER</Text>
            <Text>{gender || 'Not set'}</Text>
          </Col>
        </Row>

        <div className="flex items-baseline justify-between w-full mt-10">
          <div className="flex-1 mr-5">
            <div className="h-0.5 w-16 bg-brd rounded-full" />
            <button className="mt-2 text-button-pri font-light text-base" onClick={onClickDelete}>
              Delete this patient
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        visible={isConfirmDeleteModalVisible}
        title="Delete patient"
        messages={['This action cannot undo', 'Are you sure?']}
        buttonLeftTitle="Delete"
        buttonRightTitle="Cancel"
        onClickButtonLeft={onClickOkDelete}
        onClickButtonRight={onClickCancelDelete}
      />
    </div>
  );
}

const mapState = (state: RootState) => ({
  selectedPatient: state.patientModel.selectedPatient,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doDeletePatient: dispatch.patientModel.doDeletePatient,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const PatientDetailsPage = connect(mapState, mapDispatch)(PatientDetailsPageContainer);
