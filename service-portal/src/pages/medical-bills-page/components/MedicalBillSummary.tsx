import { UserOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import classNames from 'classnames';
import { Text } from 'components';
import { MedicalBillSumary } from 'interfaces';
import moment from 'moment';
import { memo } from 'react';
import { Status } from './Status';

interface Props {
  index: number;
  billSummary: MedicalBillSumary;
  onClick: () => void;
  onDelete: () => void;
}

export const MedicalBillSummary = memo(({ index, billSummary, onClick, onDelete }: Props) => {
  return (
    <Row
      gutter={24}
      className={classNames('flex items-center px-5', {
        'bg-black bg-opacity-[2.5%]': index % 2 !== 0,
      })}
    >
      <Col span={3} className="flex flex-col cursor-pointer hover:underline py-3" onClick={onClick}>
        <Text className="font-semibold">
          {moment(billSummary.createdAt).format('ddd D MMM YY')}
        </Text>
        <Text>{moment(billSummary.createdAt).format('H:mm A')}</Text>
      </Col>
      <Col span={5} className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden">
        <UserOutlined className="text-typo-tertiary text-lg pb-1 mr-1" />
        <Text>{billSummary.patientFullName}</Text>
      </Col>
      <Col span={10} className="whitespace-nowrap text-ellipsis overflow-hidden">
        <Text>{billSummary.symptomDescription}</Text>
      </Col>
      <Col span={4}>
        <Status status={billSummary.status} />
      </Col>
      <Col span={2}>
        <button
          disabled={billSummary.status !== 'pending'}
          className="px-3 text-center text-button-primary transition-all duration-100 hover:bg-black hover:bg-opacity-5 active:bg-opacity-10 disabled:opacity-50 disabled:hover:no-underline disabled:cursor-not-allowed"
          onClick={onDelete}
        >
          Delete
        </button>
      </Col>
    </Row>
  );
});
