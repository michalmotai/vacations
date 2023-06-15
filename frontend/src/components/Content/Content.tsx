import React, {FC} from 'react';

import styles from './Content.module.scss';
import Router from "../Router/Router";


interface ContentProps {

}

const Content: FC<ContentProps> = () => {

    return (
        <main className={styles.Content}>
            <Router/>
        </main>
    )
}





export default Content;
