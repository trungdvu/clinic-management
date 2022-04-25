import {
  ManOutlined,
  MehOutlined,
  PhoneOutlined,
  UserOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import classNames from 'classnames';
import { Text } from 'components';
import { Patient } from 'interfaces';
import moment from 'moment';
import { memo, useCallback } from 'react';

interface Props {
  index: number;
  patient: Patient;
  onClick: () => void;
}

export const PatientRow = memo(({ index, patient, onClick }: Props) => {
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
    <Row
      gutter={24}
      className={classNames(
        'flex items-center py-3 px-5 group cursor-pointer transition-all duration-100 hover:underline',
        {
          'bg-black bg-opacity-[2.5%]': index % 2 !== 0,
        },
      )}
      onClick={onClick}
    >
      <Col span={4} className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden">
        <UserOutlined className="text-tertiary text-lg pb-1 mr-1" />
        <Text>{patient.fullName}</Text>
      </Col>
      <Col span={4} className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden">
        <PhoneOutlined className="text-tertiary text-lg pb-1 mr-1" />
        <Text>{patient.phoneNumber}</Text>
      </Col>
      <Col span={4} className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden">
        <Text>{moment(patient.dayOfBirth).format('DD/MM/YYYY')}</Text>
      </Col>
      <Col span={4} className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden">
        {renderPatientGender(patient.gender)}
      </Col>
      <Col span={8} className="whitespace-nowrap text-ellipsis overflow-hidden">
        <Text>{patient.address}</Text>
      </Col>
    </Row>
  );
});
