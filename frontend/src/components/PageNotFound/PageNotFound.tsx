import React, { FC } from 'react';
import styles from './PageNotFound.module.scss';

interface PageNotFoundProps { }

const PageNotFound: FC<PageNotFoundProps> = () => (
    <div className={styles.PageNotFound}>
        <p>The page you are looking for, does not exist</p>
        <iframe width="560" height="315" allow="autoplay" title="Page not found!" src="https://www.youtube.com/embed/lkIFF4maKMU"></iframe>
    </div>
);

export default PageNotFound;
