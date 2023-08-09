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
        <div
          className={`${styles.menuContainer} ${styles.AuthMenu__menuContainer}`}>
          {/* //1 */}
          <div>
            Welcome {user.firstName} {user.lastName}
          </div>
          {/* //2 */}
          {user.role === 'admin' && (
            <div>
              <NavLink to="/admin">Admin Panel</NavLink>
            </div>
          )}
          {/* //3 */}
          <div>
            <NavLink onClick={logoutHandler} to="#">
              Logout
            </NavLink>
          </div>
        </div>
      );
    }
    return (
      <div className={`${styles.AuthMenu__menuContainer}`}>
        <div>
          don't be a stranger please login
          <NavLink to="/login"> Login </NavLink>
        </div>

        <div>
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
    );
  };

  return <>{renderContent()}</>;
};

export default AuthMenu;
