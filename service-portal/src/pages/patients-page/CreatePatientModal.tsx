import { ManOutlined, MehOutlined, WomanOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, InputNumber, Modal, ModalProps, Select } from 'antd';
import classNames from 'classnames';
import { ModalHeader, PrimaryButton, SecondaryButton, Text } from 'components';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from 'store';

const { Option } = Select;

const { TextArea } = Input;

interface Props extends PropsFromStore, ModalProps {}

function CreatePatientModalContainer({ className, ...props }: Props): JSX.Element {
  function onFinish(values: any): void {
    console.log('🚀 ~ values', values);
  }

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
          label="PATIENT FULL NAME"
          name="fullname"
          rules={[{ required: true, message: "Patient's name is required" }]}
          className="w-full"
        >
          <Input placeholder="E.g. Daivd Beckham, Aubrey Drake Graham" className="h-[40px]" />
        </Form.Item>

        <div className="flex items-center justify-start gap-5 w-full">
          <Form.Item
            requiredMark="optional"
            label="GENDER"
            name="gender"
            rules={[{ required: true, message: 'Please select a gender' }]}
            className="w-1/2"
          >
            <Select
              size="large"
              placeholder="No default"
              className="w-full text-sm"
              onChange={() => {}}
              onSearch={() => {}}
            >
              <Option value="Male">
                <div className="flex items-center">
                  <ManOutlined className="text-tertiary text-lg pb-1 mr-1" />
                  <Text>Male</Text>
                </div>
              </Option>
              <Option value="Female">
                <div className="flex items-center">
                  <WomanOutlined className="text-tertiary text-lg pb-1 mr-1" />
                  <Text>Female</Text>
                </div>
              </Option>
              <Option value="NotToPrefer">
                <div className="flex items-center">
                  <MehOutlined className="text-tertiary text-lg pb-1 mr-1" />
                  <Text>Not to prefer</Text>
                </div>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            requiredMark="optional"
            label="DATE OF BIRTH"
            name="dateOfBirth"
            rules={[{ required: true, message: '' }]}
            className="w-1/2 text-tertiary text-sm"
          >
            <DatePicker className="py-2 w-full font-normal" placeholder="No default" />
          </Form.Item>
        </div>

        <Form.Item
          requiredMark="optional"
          label="PHONE NUMBER"
          name="phoneNumber"
          rules={[{ required: true, message: 'Phone number is invalid' }]}
          className="w-full"
        >
          <InputNumber
            size="large"
            placeholder="0987674314"
            controls={false}
            className="text-sm w-full"
          />
        </Form.Item>

        <Form.Item label="ADDRESS" name="address" className="w-full">
          <TextArea rows={4} placeholder="Optional" className="w-full text-sm" />
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

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const CreatePatientModal = connect(mapState, mapDispatch)(CreatePatientModalContainer);
