import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { DatePicker, Form, Input, Modal, ModalProps } from 'antd';
import classNames from 'classnames';
import { ModalHeader, PrimaryButton, Text } from 'components';
import { SignUpPayload } from 'interfaces';
import _ from 'lodash';
import moment from 'moment';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from 'store';
import './SignUpModal.css';

const { useForm, Item } = Form;

interface Props extends PropsFromStores, ModalProps {
  onCancel?: () => void;
  onOk?: () => void;
}

function SignUpModalContainer({
  loading,
  doSignUp,
  className,
  errorMessages,
  onCancel,
  ...props
}: Props): JSX.Element {
  const [form] = useForm();

  const onFinish = useCallback(
    (values: any) => {
      const payload: SignUpPayload = {
        ...values,
        passwordConfirm: values.password,
        dayOfBirth: moment(values.dayOfBirth).toISOString(),
      };

      doSignUp(payload);
    },
    [doSignUp],
  );

  const _onCancel = useCallback(() => {
    if (onCancel) {
      form.resetFields();
      onCancel();
    }
  }, [form, onCancel]);

  return (
    <Modal
      footer={null}
      title={<ModalHeader title="Sign Up" subTitle="It's quick and easy." />}
      className={classNames('w-max p-0 max-w-lg', className)}
      onCancel={_onCancel}
      {...props}
    >
      <Form
        form={form}
        name="signUp"
        autoComplete="off"
        layout="vertical"
        className="flex flex-col items-center gap-2"
        onFinish={onFinish}
      >
        <div className="flex items-center w-full gap-2">
          <Item
            name="firstName"
            required
            rules={[{ required: true }]}
            className="w-1/2 bg-opacity-50 rounded-md bg-brd"
          >
            <Input
              placeholder="First name"
              className="w-full py-2 text-sm font-medium rounded-md"
            />
          </Item>
          <Item
            name="lastName"
            required
            rules={[{ required: true }]}
            className="w-1/2 bg-opacity-50 rounded-md bg-brd"
          >
            <Input placeholder="Surname" className="w-full py-2 text-sm rounded-md font-medium" />
          </Item>
        </div>

        <Item
          name="email"
          required
          rules={[{ required: true }]}
          className="w-full bg-opacity-50 rounded-md bg-brd"
        >
          <Input
            placeholder="Email or username"
            className="w-full py-2 text-sm font-medium rounded-md"
          />
        </Item>

        <Item
          name="password"
          className="w-full bg-opacity-50 rounded-md bg-brd"
          required
          rules={[{ required: true }]}
        >
          <Input.Password
            placeholder="Password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            className="w-full py-1.5 text-sm font-medium bg-opacity-50 rounded-md bg-brd"
          />
        </Item>

        <Item name="dayOfBirth" className="w-full bg-opacity-50 rounded-md bg-brd">
          <DatePicker
            className="w-full py-1.5 rounded-md bg-brd bg-opacity-50"
            placeholder="Day of birth"
          />
        </Item>

        {_.map(errorMessages, (message, index) => (
          <Text key={index} type="danger" className="w-full mt-2">
            *{message}
          </Text>
        ))}

        <Text className="w-full mt-2 text-xs text-tertiary">
          *By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may
          receive SMS notifications from us and can opt out at any time.
        </Text>

        <Item className="mt-2">
          <PrimaryButton htmlType="submit" loading={loading.doSignUp} className="px-20">
            Sign Up
          </PrimaryButton>
        </Item>
      </Form>
    </Modal>
  );
}

const mapState = (state: RootState) => ({
  loading: state.loading.effects.authModel,
  errorMessages: state.authModel.errorMessages,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doSignUp: dispatch.authModel.doSignUp,
});

type PropsFromStores = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const SignUpModel = connect(mapState, mapDispatch)(SignUpModalContainer);
