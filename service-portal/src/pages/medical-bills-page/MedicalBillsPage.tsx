import { DownOutlined, PlusOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons';
import { Col, DatePicker, Row, Tabs, Tooltip } from 'antd';
import classNames from 'classnames';
import { Heading, IconButton, PrimaryButton, Text } from 'components';
import { useTitle } from 'hooks';
import _ from 'lodash';
import moment from 'moment';
import { Status } from './Status';
import './MedicalBillsPage.css';
import { NewMedicalBillModal } from './NewMedicalBillModal';
import { useState } from 'react';

interface Props {
  title?: string;
}

export const BookingsPage = ({ title }: Props) => {
  const [isCreateMedicalBillVisible, setIsCreateMedicalBillVisible] = useState<boolean>(false);

  function onClickNewMedicalBill(): void {
    setIsCreateMedicalBillVisible(true);
  }

  function onCancelNewMedicalBill(): void {
    setIsCreateMedicalBillVisible(false);
  }

  useTitle(title);

  return (
    <div>
      <NewMedicalBillModal visible={isCreateMedicalBillVisible} onCancel={onCancelNewMedicalBill} />
      <div className="flex justify-between">
        <Heading level={3}>Medical bills</Heading>
        <div className="flex items-center gap-5">
          <Tooltip title="Refresh this page" placement="bottom" className="text-xs">
            <IconButton size="large" icon={<ReloadOutlined />} />
          </Tooltip>
          <PrimaryButton icon={<PlusOutlined />} onClick={onClickNewMedicalBill}>
            New medical bill
          </PrimaryButton>
        </div>
      </div>
      <Tabs type="card" defaultActiveKey="1" className="pb-10">
        <Tabs.TabPane key={1} tab="All medical bills">
          <DatePicker.RangePicker
            allowClear={false}
            format={'d MMMM'}
            suffixIcon={<DownOutlined className="text-link" />}
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
          {_.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], (bill, index) => (
            <Row
              key={index}
              gutter={24}
              className={classNames('flex items-center px-5', {
                'bg-black bg-opacity-[2.5%]': index % 2 !== 0,
              })}
            >
              <Col span={4} className="flex flex-col cursor-pointer hover:underline py-3">
                <Text className="font-semibold">{moment().format('ddd D MMM YY')}</Text>
                <Text>{moment().format('H:mm A')}</Text>
              </Col>
              <Col
                span={4}
                className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden"
              >
                <UserOutlined className="text-tertiary text-lg pb-1 mr-1" />
                <Text>Vu Dinh Trung</Text>
              </Col>
              <Col span={10} className="whitespace-nowrap text-ellipsis overflow-hidden">
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolores voluptatum
                  recusandae, hic sapiente a voluptates nihil iste in provident esse maiores
                  consequuntur eveniet, deleniti reprehenderit beatae porro aspernatur. Provident!
                </Text>
              </Col>
              <Col span={4}>
                <Status status="PENDING" />
              </Col>
              <Col span={2}>
                <button className="text-button-pri hover:underline px-2 py-1">Delete</button>
              </Col>
            </Row>
          ))}
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
    </div>
  );
};
