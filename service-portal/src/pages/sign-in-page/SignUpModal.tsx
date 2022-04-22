import { EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Input, Modal, ModalProps, notification, Tooltip } from 'antd';
import classNames from 'classnames';
import { ModalHeader, PrimaryButton, Text } from 'components';
import { SignUpPayload } from 'interfaces';
import { memo, useCallback } from 'react';
import { connect } from 'react-redux';
import { ErrorModel } from 'shared';
import { RootDispatch, RootState } from 'store';
import { regExpEmail, regExpNumber } from 'utils';
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
  onCancel,
  ...props
}: Props): JSX.Element {
  const [form] = useForm();

  const onFinish = useCallback(
    async (values: any) => {
      const payload: SignUpPayload = {
        ...values,
        passwordConfirm: values.password,
      };

      const result = await doSignUp(payload);
      if (result instanceof ErrorModel) {
        notification.error({
          message: 'Failed',
          description: result.data?.message || 'Ops! Something went worng.',
        });
      }
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
          <Item name="firstName" rules={[{ required: true }]} className="w-1/2 rounded-md">
            <Input
              placeholder="First name"
              className="w-full py-2 text-sm font-medium rounded-md bg-brd bg-opacity-50"
            />
          </Item>
          <Item name="lastName" rules={[{ required: true }]} className="w-1/2 rounded-md">
            <Input
              placeholder="Surname"
              className="w-full py-2 text-sm rounded-md font-medium bg-brd bg-opacity-50"
            />
          </Item>
        </div>

        <Item
          name="email"
          rules={[{ required: true, pattern: regExpEmail }]}
          className="w-full rounded-md"
        >
          <Input
            placeholder="Email"
            className="w-full py-2 text-sm font-medium rounded-md bg-brd bg-opacity-50"
          />
        </Item>

        <Item
          name="password"
          className="w-full rounded-md"
          rules={[{ required: true, pattern: regExpNumber }]}
        >
          <Input.Password
            placeholder="Password"
            iconRender={(visible) => (
              <div className="flex items-center justify-center">
                {visible ? (
                  <EyeTwoTone className="cursor-pointer" />
                ) : (
                  <EyeInvisibleOutlined className="cursor-pointer" />
                )}
                <Tooltip
                  title="You need enter a strong password. Containing at least 8 characters, including numbers, special symbols."
                  placement="bottom"
                  className="text-xs"
                >
                  <QuestionCircleOutlined className="ml-2" />
                </Tooltip>
              </div>
            )}
            className="w-full py-1.5 text-sm font-medium bg-opacity-50 rounded-md bg-brd"
          />
        </Item>

        <Item
          name="phoneNumber"
          tooltip="At least 9 to 15 numbers"
          rules={[{ required: true, pattern: new RegExp(/^[0-9]*$/g) }]}
          className="w-full rounded-md"
        >
          <Input
            maxLength={15}
            placeholder="Phone number"
            className="w-full py-2 text-sm font-medium rounded-md bg-brd bg-opacity-50"
          />
        </Item>

        <Text className="w-full mt-2 text-xs text-tertiary">
          *By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may
          receive SMS notifications from us and can opt out at any time.
        </Text>

        <Item className="mt-10">
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
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doSignUp: dispatch.authModel.doSignUp,
});

type PropsFromStores = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const SignUpModel = connect(mapState, mapDispatch)(memo(SignUpModalContainer));
