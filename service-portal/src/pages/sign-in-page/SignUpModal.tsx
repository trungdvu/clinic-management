import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import { Modal, ModalProps, Form, Input, DatePicker } from 'antd';
import { RootDispatch, RootState } from 'store';
import { ModalHeader, PrimaryButton, Text } from 'components';

const { Item } = Form;

const SignUpModalContainer: React.FC<SignUpModalContainerProps> = ({
  loading,
  doSignUp,
  className,
  ...props
}) => {
  const onFinish = (values: any) => {
    const payload = {
      ...values,
      dayOfBirth: moment(values.dayOfBirth).format().toString(),
    };
    doSignUp(payload);
  };

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
          <Item name="firstName" className="w-1/2">
            <Input
              placeholder="First name"
              className="w-full py-2 text-sm font-medium bg-opacity-50 rounded-md bg-brd"
            />
          </Item>
          <Item name="lastName" className="w-1/2">
            <Input
              placeholder="Surname"
              className="w-full py-2 text-sm font-medium bg-opacity-50 rounded-md bg-brd"
            />
          </Item>
        </div>

        <Item
          name="username"
          className="w-full"
          required
          rules={[{ required: true }]}
          requiredMark="optional"
        >
          <Input
            placeholder="Mobile number or email address"
            className="w-full py-2 text-sm font-medium bg-opacity-50 rounded-md bg-brd"
          />
        </Item>

        <Item name="dayOfBirth" className="w-full">
          <DatePicker
            className="w-full py-1.5 rounded-md bg-brd bg-opacity-50"
            placeholder="Day of birth"
          />
        </Item>

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
};

const mapState = (state: RootState) => ({
  loading: state.loading.effects.authModel,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doSignUp: dispatch.authModel.doSignUp,
});

type SignUpModalContainerProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  ModalProps;

export const SignUpModel = connect(mapState, mapDispatch)(SignUpModalContainer);
