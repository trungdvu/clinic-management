import React, { useEffect } from 'react';
import { useTitle } from 'hooks';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { Input, Form } from 'antd';
import { PAGE_ROUTES } from 'consts';
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

const { Item } = Form;

const SignInPageContainer: React.FC<SignInPageContainerProps> = ({
  title,
  currentUser,
  loading,
  doSignIn,
}) => {
  const navigate = useNavigate();

  useTitle(title);

  useEffect(() => {
    if (!_.isEmpty(currentUser)) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const onFinish = (values: SignInPayload) => {
    console.log(values);
    doSignIn(values);
  };

  const onForgottenPasswordClick = () => {
    console.log('Open forgotten password model');
  };

  return (
    <div className="flex flex-col items-center justify-between max-w-5xl min-h-screen mx-auto">
      <section className="flex gap-20 mt-32 w-max">
        <div className="mt-10">
          <Heading className="m-0 text-5xl leading-none">GoodClinic</Heading>
          <Text className="text-lg">GoodClinic supports better services.</Text>
        </div>

        <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-md shadow-md">
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

          <SecondaryButton className="py-5 w-min">
            <Link to={`/${PAGE_ROUTES.SIGN_UP.PATH}`}> Create New Account</Link>
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
