import {
  ManOutlined,
  MehOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { Col, Row, Skeleton, Tabs } from 'antd';
import classNames from 'classnames';
import { Heading, PrimaryButton, Text } from 'components';
import { useTitle } from 'hooks';
import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from 'store';
import { CreatePatientModal } from './CreatePatientModal';

interface Props extends PropsFromStore {
  title?: string;
}

function PatientsPageContainer({ title, patients, loading, doGetPatients }: Props) {
  const [isCreatePatientModalVisible, setIsCreatePatientModalVisible] = useState<boolean>(false);

  useTitle(title);

  useEffect(() => {
    doGetPatients();
  }, [doGetPatients]);

  const onClickCreatePatient = useCallback(() => {
    setIsCreatePatientModalVisible(true);
  }, []);

  const onCancelCreatePatient = useCallback(() => {
    setIsCreatePatientModalVisible(false);
  }, []);

  const renderPatientGender = useCallback((gender: string) => {
    if (gender === 'Male') {
      return (
        <>
          <ManOutlined className="text-tertiary text-lg pb-1 mr-1" />
          <Text>Male</Text>
        </>
      );
    } else if (gender === 'Female') {
      return (
        <>
          <WomanOutlined className="text-tertiary text-lg pb-1 mr-1" />
          <Text>Female</Text>
        </>
      );
    } else {
      return (
        <>
          <MehOutlined className="text-tertiary text-lg pb-1 mr-1" />
          <Text>Prefer not to say</Text>
        </>
      );
    }
  }, []);

  return (
    <div>
      <CreatePatientModal visible={isCreatePatientModalVisible} onCancel={onCancelCreatePatient} />

      <div className="flex justify-between">
        <Heading level={3}>Medical bills</Heading>
        <div className="flex items-center gap-5">
          <PrimaryButton icon={<PlusOutlined />} onClick={onClickCreatePatient}>
            Create a new patient
          </PrimaryButton>
        </div>
      </div>

      {loading.doGetPatients ? (
        <div className="flex flex-col gap-2 mt-5">
          <Skeleton.Button active={true} className="h-14 w-56" />
          <Skeleton.Button active={true} className="h-14" block={true} />
        </div>
      ) : (
        <Tabs type="card" defaultActiveKey="1" className="pb-10">
          <Tabs.TabPane key={1} tab="All patients">
            <Row gutter={24} className="px-5 py-3 text-tertiary font-medium">
              <Col span={4}>PATIENT NAME</Col>
              <Col span={4}>PHONE NUMBER</Col>
              <Col span={4}>DAY OF BIRTH</Col>
              <Col span={4}>GENDER</Col>
              <Col span={8}>ADDRESS</Col>
            </Row>
            <div className="h-px bg-brd" />
            {_.map(patients, (patient, index) => (
              <Row
                key={index}
                gutter={24}
                className={classNames(
                  'flex items-center py-3 px-5 group cursor-pointer transition-all duration-100 hover:underline',
                  {
                    'bg-black bg-opacity-[2.5%]': index % 2 !== 0,
                  },
                )}
              >
                <Col
                  span={4}
                  className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  <UserOutlined className="text-tertiary text-lg pb-1 mr-1" />
                  <Text>{patient.fullName}</Text>
                </Col>
                <Col
                  span={4}
                  className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  <PhoneOutlined className="text-tertiary text-lg pb-1 mr-1" />
                  <Text>{patient.phoneNumber}</Text>
                </Col>
                <Col
                  span={4}
                  className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  <Text>{moment(patient.dayOfBirth).format('DD/MM/YYYY')}</Text>
                </Col>
                <Col
                  span={4}
                  className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  {renderPatientGender(patient.gender)}
                </Col>
                <Col span={8} className="whitespace-nowrap text-ellipsis overflow-hidden">
                  <Text>{patient.address}</Text>
                </Col>
              </Row>
            ))}
          </Tabs.TabPane>
        </Tabs>
      )}
    </div>
  );
}

const mapState = (state: RootState) => ({
  patients: state.patientModel.patients,
  loading: state.loading.effects.patientModel,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doGetPatients: dispatch.patientModel.doGetPatients,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const PatientsPage = connect(mapState, mapDispatch)(PatientsPageContainer);
