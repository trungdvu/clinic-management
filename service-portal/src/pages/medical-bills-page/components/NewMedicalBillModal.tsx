import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Modal, ModalProps, notification } from 'antd';
import classNames from 'classnames';
import { DebounceSelect, ModalHeader, PrimaryButton, SecondaryButton, Text } from 'components';
import { NewMedicalBillPayload, Patient } from 'interfaces';
import _ from 'lodash';
import { memo, useCallback } from 'react';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from 'store';

const { TextArea } = Input;
const { useForm, Item } = Form;

interface OptionValue {
  label: string | JSX.Element;
  value: string;
  key?: string;
}

interface Props extends PropsFromStores, ModalProps {
  onCancel?: () => void;
  onOk?: () => void;
}

function NewMedicalBillModalContainer({
  className,
  loading,
  currentUser,
  doGetPatients,
  doCreateMedicalBill,
  onCancel,
  ...props
}: Props): JSX.Element {
  const [form] = useForm();

  const onFinish = useCallback(
    async (values: any) => {
      const payload: NewMedicalBillPayload = {
        ...values,
        creatorId: currentUser!.id,
      };
      const result = await doCreateMedicalBill(payload);

      if (result) {
        notification.success({
          message: 'Created',
          description: "You've successfully created a medical bill",
        });
        form.resetFields();
        if (onCancel) {
          onCancel();
        }
      } else {
        notification.error({
          message: 'Failed',
          description: 'Ops! Something went wrong.',
        });
      }
    },
    [currentUser, doCreateMedicalBill, form, onCancel],
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

  const getPatientOptionValues = useCallback(
    async (text: string) => {
      const patients = await doGetPatients(text);
      if (!patients) {
        return [];
      }

      const options: OptionValue[] = _.map(patients, (patient: Patient) => ({
        value: patient.id,
        key: patient.id,
        label: (
          <>
            <div className="flex items-center">
              <UserOutlined className="text-tertiary text-lg pb-1 mr-1" />
              <Text>{patient.fullName}</Text>
            </div>
            <div className="flex items-center">
              <PhoneOutlined className="text-tertiary text-lg pb-1 mr-1" />
              <Text className="font-light">{patient.phoneNumber}</Text>
            </div>
          </>
        ),
      }));
      return options;
    },
    [doGetPatients],
  );

  return (
    <Modal
      footer={null}
      title={<ModalHeader title="Create a new medical bill" />}
      className={classNames('p-0 w-[768px] min-h-[720px]', className)}
      onCancel={_onCancel}
      {...props}
    >
      <Form
        form={form}
        name="newMedicalBill"
        autoComplete="off"
        layout="vertical"
        className="flex flex-col items-center gap-4"
        onFinish={onFinish}
      >
        <Item
          requiredMark="optional"
          name="patientId"
          label="PATIENT"
          rules={[{ required: true }]}
          className="w-full text-tertiary"
        >
          <DebounceSelect
            size="large"
            placeholder="Select a patient"
            className="w-full text-sm"
            fetchOptions={getPatientOptionValues}
          />
        </Item>

        <Item
          requiredMark="optional"
          label="SYSTOMS"
          name="symptomDescription"
          rules={[{ required: true }]}
          className="w-full"
        >
          <TextArea
            rows={6}
            placeholder="What are the patient's systems?"
            className="w-full text-sm"
          />
        </Item>

        <Item label="PREDICTION" name="prediction" className="w-full">
          <TextArea rows={6} placeholder="Optional" className="w-full text-sm" />
        </Item>

        <div className="flex items-center w-full mt-10 gap-4">
          <Item>
            <PrimaryButton htmlType="submit" loading={loading.doCreateMedicalBill}>
              Create
            </PrimaryButton>
          </Item>
          <SecondaryButton onClick={_onCancel} disabled={loading.doCreateMedicalBill}>
            Cancel
          </SecondaryButton>
        </div>
      </Form>
    </Modal>
  );
}

const mapState = (state: RootState) => ({
  loading: state.loading.effects.medicalBillModel,
  currentUser: state.authModel.currentUser,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doGetPatients: dispatch.patientModel.doGetPatients,
  doCreateMedicalBill: dispatch.medicalBillModel.doCreateMedicalBill,
});

type PropsFromStores = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const NewMedicalBillModal = connect(
  mapState,
  mapDispatch,
)(memo(NewMedicalBillModalContainer));
