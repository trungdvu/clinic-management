import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Divider, Form, Input } from 'antd';
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
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authLocalStorage } from 'shared';
import { RootDispatch, RootState } from 'store';
import { SignUpModel } from './SignUpModal';

const { useForm, Item } = Form;

interface Props extends PropsFromStore {
  title?: string;
}

function SignInPageContainer({
  title,
  currentUser,
  errorMessages,
  loading,
  doSignIn,
  setErrorMessages,
}: Props) {
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

  function onFinish(values: SignInPayload): void {
    doSignIn(values);
  }

  function onClickForgottenPassword(): void {
    navigate(PAGE_ROUTES.ACCOUNT_RECOVER.PATH);
  }

  function onClickCreateAccount(): void {
    setIsSignInModalVisible(true);
  }

  function onCancelSignUpModal(): void {
    setIsSignInModalVisible(false);
  }

  function onChangeForm(): void {
    if (!_.isEmpty(errorMessages)) {
      setErrorMessages([]);
    }
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
            onChange={onChangeForm}
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
              className="mb-1"
            >
              <Input.Password
                placeholder="Password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                className="py-3 text-sm font-medium rounded-md w-80"
              />
            </Item>

            <Item className="mb-0">
              <div className="min-h-[22px] flex flex-col mb-1">
                {_.map(errorMessages, (message, index) => (
                  <Text key={index} type="danger" className="w-full">
                    *{message}
                  </Text>
                ))}
              </div>

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
  errorMessages: state.authModel.errorMessages,
  loading: state.loading.effects.authModel,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doSignIn: dispatch.authModel.doSignIn,
  setErrorMessages: dispatch.authModel.setErrorMessages,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const SignInPage = connect(mapState, mapDispatch)(SignInPageContainer);
