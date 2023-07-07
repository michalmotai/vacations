import React, { FC } from 'react';
import styles from './AuthMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../auth/authSlice';

interface AuthMenuProps {}

const AuthMenu: FC<AuthMenuProps> = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authState);
  const logoutHandler = () => {
    dispatch(logout());
  };

  const renderContent = () => {
    if (user) {
      return (
        <>
          <span>
            Hello {user.firstName}
            {user.lastName}
            {user.role === 'admin' && (
              <NavLink to="/admin">Admin Panel</NavLink>
            )}
            <NavLink onClick={logoutHandler} to="#">
              Logout
            </NavLink>
          </span>
        </>
      );
    }
    return (
      <>
        <span>
          Hello Guest | <NavLink to="/login">Login </NavLink>
        </span>
        <span>|</span>
        <NavLink to="/register">Register</NavLink>
      </>
    );
  };

  return <div className={styles.AuthMenu}>{renderContent()}</div>;
};

export default AuthMenu;
