import React, { FC } from 'react';

import styles from './Header.module.scss';
import {NavLink} from "react-router-dom";

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

    return (
        <header className={styles.Header}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/otherComponent">other component</NavLink>
            <NavLink to="/navlink">navlink</NavLink>
        </header>
    )
}





export default Header
