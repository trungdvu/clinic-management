import React, { useEffect, useState } from 'react';
import { useTitle } from 'hooks';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { Input, Form } from 'antd';
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
import { SignUpModel } from './views';

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
    <div className="flex flex-col items-center justify-between max-w-5xl min-h-screen mx-auto">
      <SignUpModel visible={isSignInModalVisible} onCancel={onSignUpModelCancel} />

      <section className="flex gap-20 mt-32 w-max">
        <div className="mt-10">
          <Heading className="m-0 text-5xl leading-none">GreatClinic</Heading>
          <Text className="text-lg">Our business, your comforts.</Text>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-md shadow-lg">
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
              className="mb-2"
            >
              <Input
                placeholder="Email address or username"
                className="py-3 text-sm font-medium rounded-md w-72"
              />
            </Item>
            <Item
              name="password"
              rules={[{ required: true, message: 'Password is required.' }]}
              className="mb-4"
            >
              <Input placeholder="Password" className="py-3 text-sm font-medium rounded-md w-72" />
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
