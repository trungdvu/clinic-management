import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { DatePicker, Form, Input, Modal, ModalProps } from 'antd';
import classNames from 'classnames';
import { ModalHeader, PrimaryButton, Text } from 'components';
import { SignUpPayload } from 'interfaces';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootDispatch, RootState } from 'store';
import './SignUpModal.css';

interface Props extends PropsFromStores, ModalProps {}

function SignUpModalContainer({
  loading,
  doSignUp,
  className,
  errorMessages,
  ...props
}: Props): JSX.Element {
  function onFinish(values: any): void {
    const payload: SignUpPayload = {
      ...values,
      passwordConfirm: values.password,
      dayOfBirth: moment(values.dayOfBirth).toISOString(),
    };
    doSignUp(payload);
  }

  return (
    <Modal
      footer={null}
      title={<ModalHeader title="Sign Up" subTitle="It's quick and easy." />}
      className={classNames('w-max p-0 max-w-lg', className)}
      {...props}
    >
      <Form
        name="signUp"
        autoComplete="off"
        layout="vertical"
        className="flex flex-col items-center gap-2"
        onFinish={onFinish}
      >
        <div className="flex items-center w-full gap-2">
          <Form.Item
            name="firstName"
            required
            rules={[{ required: true, message: 'Your first name is required' }]}
            className="w-1/2 bg-opacity-50 rounded-md bg-brd"
          >
            <Input
              placeholder="First name"
              className="w-full py-2 text-sm font-medium rounded-md"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            required
            rules={[{ required: true, message: 'Your last name is required' }]}
            className="w-1/2 bg-opacity-50 rounded-md bg-brd"
          >
            <Input placeholder="Surname" className="w-full py-2 text-sm rounded-md font-medium" />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          required
          rules={[{ required: true, message: 'Enter your email or username' }]}
          className="w-full bg-opacity-50 rounded-md bg-brd"
        >
          <Input
            placeholder="Email or username"
            className="w-full py-2 text-sm font-medium rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="password"
          className="w-full bg-opacity-50 rounded-md bg-brd"
          required
          rules={[{ required: true, message: 'Enter a valid password' }]}
        >
          <Input.Password
            placeholder="Password"
            color="#000"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            className="w-full py-1.5 text-sm font-medium bg-opacity-50 rounded-md bg-brd"
          />
        </Form.Item>

        <Form.Item name="dayOfBirth" className="w-full bg-opacity-50 rounded-md bg-brd">
          <DatePicker
            className="w-full py-1.5 rounded-md bg-brd bg-opacity-50"
            placeholder="Day of birth"
          />
        </Form.Item>

        {_.map(errorMessages, (message, index) => (
          <Text key={index} type="danger" className="w-full mt-2 text-xs">
            *{message}
          </Text>
        ))}

        <Text className="w-full mt-2 text-xs text-tertiary">
          *By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may
          receive SMS notifications from us and can opt out at any time.
        </Text>

        <Form.Item className="mt-2">
          <PrimaryButton htmlType="submit" loading={loading.doSignUp} className="px-20">
            Sign Up
          </PrimaryButton>
        </Form.Item>
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
