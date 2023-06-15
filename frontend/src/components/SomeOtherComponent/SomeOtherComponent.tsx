import React, { FC } from 'react';
import styles from './SomeOtherComponent.module.scss';


interface SomeOtherComponentProps { }

const SomeOtherComponent: FC<SomeOtherComponentProps> = () => {

    return (
        <div className={styles.SomeOtherComponent}>
            SomeOtherComponent
        </div>
    )
}





export default SomeOtherComponent
