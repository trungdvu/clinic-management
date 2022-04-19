import { Col, Form, Input, InputNumber, InputRef, notification, Row } from 'antd';
import classNames from 'classnames';
import { Text } from 'components';
import { Drug } from 'interfaces';
import _ from 'lodash';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootDispatch } from 'store';

const { useForm, Item } = Form;

interface Props extends PropsFromStore {
  medicalBillId: string;
  currentIndex: number;
  drug: Drug;
  durgs: Drug[];
}

// eslint-disable-next-line no-empty-pattern
const EditTableDrugRowContainer = ({ medicalBillId, currentIndex, drug, durgs }: Props) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [form] = useForm();

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  useEffect(() => {
    form.setFieldsValue({
      usage: drug.usage,
      unit: drug.unit,
      quantity: drug.quantity,
    });
  }, [drug, form]);

  const toggleEdit = useCallback(() => {
    setEditing((pre) => !pre);
  }, []);

  const save = useCallback(async () => {
    try {
      const values = await form.validateFields();
      console.log('🚀 ~ values', values);

      toggleEdit();
      // handle save here
    } catch (error: any) {
      const { errorFields } = error;
      let description = '';

      _.forEach(errorFields, (errorField) => {
        description += _.join(errorField.errors, '; ');
      });
      notification.error({
        message: 'Save failed',
        description,
      });
      form.setFieldsValue({
        usage: drug.usage,
        unit: drug.unit,
        quantity: drug.quantity,
      });
    }
  }, [drug, form, toggleEdit]);

  return (
    <Form form={form}>
      <Row
        gutter={24}
        className={classNames('py-3 text-primary flex items-center', {
          'bg-black bg-opacity-[2.5%]': currentIndex % 2 !== 0,
        })}
      >
        <Col span={1}>
          <Text className="whitespace-nowrap">{durgs.length - currentIndex}</Text>
        </Col>
        <Col span={5} className="pl-6">
          <Link to={'#drug details'}>{drug.name}</Link>
        </Col>
        <Col span={7} className="pl-6">
          <Item name="usage" rules={[{ required: true, message: 'Medication usage is required' }]}>
            <Input
              autoComplete="off"
              className="border-transparent hover:border transition-all duration-100"
              onPressEnter={save}
              onBlur={save}
            />
          </Item>
        </Col>
        <Col span={3} className="pl-6">
          <Item name="unit" rules={[{ required: true, message: 'Unit is required' }]}>
            <Input
              autoComplete="off"
              className="border-transparent hover:border transition-all duration-100"
              onPressEnter={save}
              onBlur={save}
            />
          </Item>
        </Col>
        <Col span={3} className="pl-6">
          <Item
            name="quantity"
            rules={[{ required: true, message: 'Quantity must greater than 1' }]}
          >
            <InputNumber
              min={1}
              autoComplete="off"
              className="border-transparent hover:border transition-all duration-100 "
              onPressEnter={save}
              onBlur={save}
            />
          </Item>
        </Col>
        <Col span={3} className="pl-6 text-right">
          $10246.99
        </Col>
        <Col span={2} className="flex justify-end">
          <button className="px-3 text-center text-button-pri transition-all duration-100 hover:bg-black hover:bg-opacity-5">
            Remove
          </button>
        </Col>
      </Row>
      <Row></Row>
    </Form>
  );
};

const mapDispatch = (dispatch: RootDispatch) => ({});

type PropsFromStore = ReturnType<typeof mapDispatch>;

export const EditableDrugRow = connect(null, mapDispatch)(memo(EditTableDrugRowContainer));
