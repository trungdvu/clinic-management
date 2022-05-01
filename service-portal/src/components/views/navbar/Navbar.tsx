import { Image } from 'antd';
import { memo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { Heading } from '../../typography';
import { ProfileDropdown } from './ProfileDropdown';

interface Props extends PropsFromStore {}

function NavbarContainer({ currentUser, doSignOut }: Props) {
  return (
    <div className="flex items-center justify-between w-full h-14 px-10 bg-white shadow">
      <Link to={'/'} className="flex items-center">
        <Image src={require('assets/images/logo.png')} preview={false} className="h-9" />
        <Heading className="mb-0 ml-1 select-none text-typo-logo">ClinicX</Heading>
      </Link>
      <ProfileDropdown currentUser={currentUser!} onSignOutClick={doSignOut} />
    </div>
  );
}

const mapState = (state: RootState) => ({
  currentUser: state.authModel.currentUser,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doSignOut: dispatch.authModel.doSignOut,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const Navbar = connect(mapState, mapDispatch)(memo(NavbarContainer));
