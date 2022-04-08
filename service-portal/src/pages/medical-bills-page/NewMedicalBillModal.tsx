import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Modal, ModalProps, Select } from 'antd';
import classNames from 'classnames';
import { ModalHeader, PrimaryButton, SecondaryButton, Text } from 'components';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from 'store';

const { Option } = Select;

const { TextArea } = Input;

interface Props extends PropsFromStores, ModalProps {}

function NewMedicalBillModalContainer({ className, ...props }: Props): JSX.Element {
  function onFinish(values: any): void {}

  return (
    <Modal
      footer={null}
      title={<ModalHeader title="Create a new medical bill" />}
      className={classNames('p-0 w-[768px] min-h-[720px]', className)}
      {...props}
    >
      <Form
        name="newMedicalBill"
        autoComplete="off"
        layout="vertical"
        className="flex flex-col items-center gap-4"
        onFinish={onFinish}
      >
        <Form.Item
          requiredMark="optional"
          label="PATIENT"
          name="patientId"
          rules={[{ required: true, message: 'A patient is required' }]}
          className="w-full text-tertiary"
        >
          <Select
            size="large"
            showSearch
            placeholder="Choose a patient"
            className="w-full text-sm"
            onChange={() => {}}
            onSearch={() => {}}
          >
            <Option value="dask-kasdk-012">
              <div className="flex items-center">
                <UserOutlined className="text-tertiary text-lg pb-1 mr-1" />
                <Text className="font-medium">Vu Dinh Trung</Text>
              </div>
              <div className="flex items-center">
                <PhoneOutlined className="text-tertiary text-lg pb-1 mr-1" />
                <Text className="font-light">098 689 1248</Text>
              </div>
            </Option>
            <Option value="iasd-1kam-mvmi7">
              <div className="flex items-center">
                <UserOutlined className="text-tertiary text-lg pb-1 mr-1" />
                <Text className="font-medium">Vu Dinh Trung</Text>
              </div>
              <div className="flex items-center">
                <PhoneOutlined className="text-tertiary text-lg pb-1 mr-1" />
                <Text className="font-light">098 689 1248</Text>
              </div>
            </Option>
            <Option value="012l-kdma-68j">
              <div className="flex items-center">
                <UserOutlined className="text-tertiary text-lg pb-1 mr-1" />
                <Text className="font-medium">Vu Dinh Trung</Text>
              </div>
              <div className="flex items-center">
                <PhoneOutlined className="text-tertiary text-lg pb-1 mr-1" />
                <Text className="font-light">098 689 1248</Text>
              </div>
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          requiredMark="optional"
          label="SYSTOMS"
          name="symptomDescription"
          rules={[{ required: true, min: 5, message: 'At least 5 characters' }]}
          className="w-full"
        >
          <TextArea
            rows={6}
            placeholder="What are the patient's systems?"
            className="w-full text-sm"
          />
        </Form.Item>

        <Form.Item label="PREDICTION" name="prediction" className="w-full">
          <TextArea rows={6} placeholder="Optional" className="w-full text-sm" />
        </Form.Item>
        {/* {_.map(errorMessages, (message, index) => (
          <Text key={index} type="danger" className="w-full mt-2 text-xs">
            *{message}
          </Text>
        ))} */}

        <div className="flex items-center w-full mt-2 gap-4">
          <Form.Item>
            <PrimaryButton htmlType="submit">Create</PrimaryButton>
          </Form.Item>
          <SecondaryButton>Cancel</SecondaryButton>
        </div>
      </Form>
    </Modal>
  );
}

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({});

type PropsFromStores = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const NewMedicalBillModal = connect(mapState, mapDispatch)(NewMedicalBillModalContainer);
