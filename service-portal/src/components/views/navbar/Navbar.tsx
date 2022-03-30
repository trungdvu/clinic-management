import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootDispatch, RootState } from 'store';
import { Image } from 'antd';
import { Heading } from '../../typography';
import { ProfileDropdown } from './ProfileDropdown';

interface Props extends PropsFromStores {}

const NavbarContainer = ({ currentUser, doSignOut }: Props) => {
  const onSignOutClick = () => {
    doSignOut();
  };

  return (
    <div className="flex items-center justify-between w-full h-16 px-5 bg-white shadow-md">
      <Link to={'/'} className="flex items-center">
        <Image src={require('assets/images/logo.png')} preview={false} className="w-20 h-20" />
        <Heading className="mb-0 select-none">XClinic</Heading>
      </Link>
      <ProfileDropdown currentUser={currentUser} onSignOutClick={onSignOutClick} />
    </div>
  );
};

const mapState = (state: RootState) => ({
  currentUser: state.authModel.currentUser,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  doSignOut: dispatch.authModel.doSignOut,
});

type PropsFromStores = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const Navbar = connect(mapState, mapDispatch)(NavbarContainer);
