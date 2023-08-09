import React, { FC } from 'react';

import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import AuthMenu from '../AuthArea/AuthMenu/AuthMenu';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className={styles.Header}>
      <NavLink to="/">Home</NavLink>
      <AuthMenu />
    </header>
  );
};

export default Header;
