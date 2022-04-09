import { PhoneOutlined, PlusOutlined, UserOutlined, WomanOutlined } from '@ant-design/icons';
import { Col, Row, Tabs } from 'antd';
import classNames from 'classnames';
import { Heading, PrimaryButton, Text } from 'components';
import { useTitle } from 'hooks';
import _ from 'lodash';
import { useState } from 'react';
import { CreatePatientModal } from './CreatePatientModal';

interface Props {
  title?: string;
}

export const PatientsPage = ({ title }: Props) => {
  const [isCreatePatientModalVisible, setIsCreatePatientModalVisible] = useState<boolean>(false);

  useTitle(title);

  function onClickCreatePatient(): void {
    setIsCreatePatientModalVisible(true);
  }

  function onCancelCreatePatient(): void {
    setIsCreatePatientModalVisible(false);
  }

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
          {_.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], (patient, index) => (
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
                <Text>Vu Dinh Trung</Text>
              </Col>
              <Col
                span={4}
                className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden"
              >
                <PhoneOutlined className="text-tertiary text-lg pb-1 mr-1" />
                <Text>09867673421</Text>
              </Col>
              <Col
                span={4}
                className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden"
              >
                <Text>17/06/2000</Text>
              </Col>
              <Col
                span={4}
                className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden"
              >
                <WomanOutlined className="text-tertiary text-lg pb-1 mr-1" />
                <Text>Female</Text>
              </Col>
              <Col span={8} className="whitespace-nowrap text-ellipsis overflow-hidden">
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolores voluptatum
                  recusandae, hic sapiente a voluptates nihil iste in provident esse maiores
                  consequuntur eveniet, deleniti reprehenderit beatae porro aspernatur. Provident!
                </Text>
              </Col>
            </Row>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
