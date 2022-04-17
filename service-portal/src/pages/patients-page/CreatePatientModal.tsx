import { ManOutlined, MehOutlined, WomanOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, Modal, ModalProps, notification, Select } from 'antd';
import classNames from 'classnames';
import { ModalHeader, PrimaryButton, SecondaryButton, Text } from 'components';
import { CreatePatientPayload } from 'interfaces';
import moment from 'moment';
import { memo, useCallback } from 'react';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from 'store';

const { Option } = Select;
const { TextArea } = Input;
const { useForm, Item } = Form;

interface Props extends PropsFromStore, ModalProps {
  onCancel?: () => void;
  onOk?: () => void;
}

function CreatePatientModalContainer({
  className,
  loading,
  doCreatePatient,
  onCancel,
  ...props
}: Props): JSX.Element {
  const [form] = useForm();

  const onFinish = useCallback(
    async (values: any) => {
      const payload: CreatePatientPayload = {
        ...values,
        dayOfBirth: moment(values.dayOfBirth).toISOString(),
      };
      const result = await doCreatePatient(payload);

      if (result) {
        notification.success({
          message: 'Successfully',
          description: "You've created a patient.",
        });
        form.resetFields();
        if (onCancel) {
          onCancel();
        }
      } else {
        notification.error({ message: 'Ops! Something went wrong.' });
      }
    },
    [doCreatePatient, form, onCancel],
  );

  const _onCancel = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      form.resetFields();
      if (onCancel) {
        onCancel();
      }
    },
    [form, onCancel],
  );

  return (
    <Modal
      footer={null}
      title={<ModalHeader title="Create a new patient" />}
      className={classNames('p-0 w-[768px]')}
      onCancel={_onCancel}
      {...props}
    >
      <Form
        form={form}
        name="createPatient"
        autoComplete="off"
        layout="vertical"
        className="flex flex-col items-center gap-4"
        onFinish={onFinish}
      >
        <Item
          requiredMark="optional"
          label="PATIENT FULL NAME"
          name="fullName"
          rules={[{ required: true }]}
          className="w-full"
        >
          <Input
            type="text"
            placeholder="E.g. Daivd Beckham, Aubrey Drake Graham"
            className="h-[40px]"
          />
        </Item>

        <div className="flex items-center justify-start gap-5 w-full">
          <Item
            requiredMark="optional"
            label="GENDER"
            name="gender"
            rules={[{ required: true }]}
            className="w-1/2"
          >
            <Select size="large" placeholder="No default" className="w-full text-sm">
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
              <Option value="Not to prefer">
                <div className="flex items-center">
                  <MehOutlined className="text-tertiary text-lg pb-1 mr-1" />
                  <Text>Not to prefer</Text>
                </div>
              </Option>
            </Select>
          </Item>

          <Item
            requiredMark="optional"
            label="DATE OF BIRTH"
            name="dayOfBirth"
            rules={[{ required: true }]}
            className="w-1/2 text-tertiary text-sm"
          >
            <DatePicker
              placeholder="No default"
              format="DD MMM YYYY"
              className="py-2 w-full font-normal"
            />
          </Item>
        </div>

        <Item
          requiredMark="optional"
          label="PHONE NUMBER"
          name="phoneNumber"
          tooltip="At least 9 to 15 numbers"
          rules={[{ required: true, pattern: new RegExp(/^[0-9]*$/g) }]}
          className="w-full"
        >
          <Input
            size="large"
            maxLength={15}
            minLength={9}
            placeholder="0987674314"
            className="text-sm w-full"
          />
        </Item>

        <Item label="ADDRESS" name="address" className="w-full">
          <TextArea rows={4} placeholder="Optional" className="w-full text-sm" />
        </Item>

        <div className="flex items-center w-full mt-10 gap-4">
          <Item>
            <PrimaryButton htmlType="submit" loading={loading.doCreatePatient}>
              Create
            </PrimaryButton>
          </Item>
          <SecondaryButton disabled={loading.doCreatePatient} onClick={_onCancel}>
            Cancel
          </SecondaryButton>
        </div>
      </Form>
    </Modal>
  );
}

const mapState = (state: RootState) => ({
  loading: state.loading.effects.patientModel,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doCreatePatient: dispatch.patientModel.doCreatePatient,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const CreatePatientModal = connect(mapState, mapDispatch)(memo(CreatePatientModalContainer));
