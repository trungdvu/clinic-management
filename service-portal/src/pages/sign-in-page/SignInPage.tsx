import React, { useEffect, useState } from 'react';
import { useTitle } from 'hooks';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { Input, Form, Divider } from 'antd';
import { SignInPayload } from 'interfaces';
import { RootDispatch, RootState } from 'store';
import {
  Heading,
  HyperLinkButton,
  NonAuthFooter,
  PrimaryButton,
  SecondaryButton,
  Text,
} from 'components';
import { SignUpModel } from './SignUpModal';

const { Item } = Form;

const SignInPageContainer: React.FC<SignInPageContainerProps> = ({
  title,
  currentUser,
  loading,
  doSignIn,
}) => {
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);

  const navigate = useNavigate();

  useTitle(title);

  useEffect(() => {
    if (!_.isEmpty(currentUser)) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const onFinish = (values: SignInPayload) => {
    doSignIn(values);
  };

  const onForgottenPasswordClick = () => {
    console.log('Open forgotten password model');
  };

  const onCreateNewAccountClick = () => {
    setIsSignInModalVisible(true);
  };

  const onSignUpModelCancel = () => {
    setIsSignInModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen mx-auto">
      <SignUpModel visible={isSignInModalVisible} onCancel={onSignUpModelCancel} />

      <section className="flex justify-between max-w-screen-lg mt-32">
        <div className="mt-10 mr-44">
          <Heading className="m-0 leading-none text-7xl">XClinic</Heading>
          <Text className="text-2xl">Our business, your comforts.</Text>
        </div>

        <div className="flex flex-col items-center gap-4 p-5 bg-white rounded-md shadow-lg">
          <Form
            name="login"
            autoComplete="off"
            layout="vertical"
            className="m-0"
            onFinish={onFinish}
          >
            <Item
              name="username"
              rules={[{ required: true, message: 'Please enter your email address.' }]}
              className="mb-3"
            >
              <Input
                placeholder="Email address or username"
                className="py-3 text-sm font-medium rounded-md w-80"
              />
            </Item>
            <Item
              name="password"
              rules={[{ required: true, message: 'Password is required.' }]}
              className="mb-5"
            >
              <Input placeholder="Password" className="py-3 text-sm font-medium rounded-md w-80" />
            </Item>
            <Item className="mb-0">
              <PrimaryButton htmlType="submit" className="w-full py-5" loading={loading.doSignIn}>
                Sign In
              </PrimaryButton>
            </Item>
          </Form>

          <HyperLinkButton size="small" className="w-min" onClick={onForgottenPasswordClick}>
            Forgotten password?
          </HyperLinkButton>

          <Divider className="p-0 m-0 border-brd" />

          <SecondaryButton className="py-5 w-min" onClick={onCreateNewAccountClick}>
            Create New Account
          </SecondaryButton>
        </div>
      </section>

      <NonAuthFooter />
    </div>
  );
};

const mapState = (state: RootState) => ({
  currentUser: state.authModel.currentUser,
  loading: state.loading.effects.authModel,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doSignIn: dispatch.authModel.doSignIn,
});

type SignInPageContainerProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> & {
    title?: string;
  };

export const SignInPage = connect(mapState, mapDispatch)(SignInPageContainer);
