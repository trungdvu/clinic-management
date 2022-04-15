import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Divider, Form, Input, notification } from 'antd';
import {
  Heading,
  HyperLinkButton,
  NonAuthFooter,
  PrimaryButton,
  SecondaryButton,
  Text,
} from 'components';
import { PAGE_ROUTES } from 'consts';
import { useTitle } from 'hooks';
import { SignInPayload } from 'interfaces';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authLocalStorage, ErrorModel } from 'shared';
import { RootDispatch, RootState } from 'store';
import { SignUpModel } from './SignUpModal';

const { useForm, Item } = Form;

interface Props extends PropsFromStore {
  title?: string;
}

function SignInPageContainer({ title, currentUser, loading, doSignIn }: Props) {
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);

  const [form] = useForm();

  const navigate = useNavigate();

  useTitle(title);

  useEffect(() => {
    authLocalStorage.load();
    form.setFieldsValue({
      email: authLocalStorage.previousEmail,
    });
  }, [form]);

  useEffect(() => {
    if (!_.isEmpty(currentUser)) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const onFinish = useCallback(
    async (values: SignInPayload) => {
      const result = await doSignIn(values);

      if (result instanceof ErrorModel) {
        notification.error({
          message: 'Authentication failed',
          description: result.data?.message,
        });
      }
    },
    [doSignIn],
  );

  function onClickForgottenPassword(): void {
    navigate(PAGE_ROUTES.ACCOUNT_RECOVER.PATH);
  }

  function onClickCreateAccount(): void {
    setIsSignInModalVisible(true);
  }

  function onCancelSignUpModal(): void {
    setIsSignInModalVisible(false);
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen mx-auto">
      <SignUpModel visible={isSignInModalVisible} onCancel={onCancelSignUpModal} />

      <section className="flex justify-between max-w-screen-lg mt-32">
        <div className="mt-10 mr-44">
          <Heading className="m-0 leading-none text-7xl">ClinicX</Heading>
          <Text className="text-2xl">Our business, your comforts.</Text>
        </div>

        <div className="flex flex-col items-center gap-4 p-5 bg-white rounded-md shadow-lg">
          <Form
            form={form}
            name="login"
            autoComplete="off"
            layout="vertical"
            className="m-0"
            onFinish={onFinish}
          >
            <Item
              name="email"
              rules={[{ required: true, message: 'Please enter your email address' }]}
              className="mb-3"
            >
              <Input
                placeholder="Email address or username"
                className="py-3 text-sm font-medium rounded-md w-80"
              />
            </Item>

            <Item
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
              className="mb-3"
            >
              <Input.Password
                placeholder="Password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                className="py-3 text-sm font-medium rounded-md w-80"
              />
            </Item>

            <Item className="mt-6">
              <PrimaryButton htmlType="submit" className="w-full py-5" loading={loading.doSignIn}>
                Sign In
              </PrimaryButton>
            </Item>
          </Form>

          <HyperLinkButton size="small" className="w-min" onClick={onClickForgottenPassword}>
            Forgotten password?
          </HyperLinkButton>

          <Divider className="p-0 m-0 border-brd" />

          <SecondaryButton className="py-5 w-min" onClick={onClickCreateAccount}>
            Create New Account
          </SecondaryButton>
        </div>
      </section>

      <NonAuthFooter />
    </div>
  );
}

const mapState = (state: RootState) => ({
  currentUser: state.authModel.currentUser,
  loading: state.loading.effects.authModel,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doSignIn: dispatch.authModel.doSignIn,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const SignInPage = connect(mapState, mapDispatch)(SignInPageContainer);
