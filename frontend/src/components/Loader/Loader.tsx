import React, { FC } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
    size?: number;
}

const Loader: FC<LoaderProps> = ({ size }) => (

    <div style={{ width: size, height: size }} className={styles.Loader}></div>
);

export default Loader;
