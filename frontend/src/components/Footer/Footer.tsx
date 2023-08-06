import React, { FC } from 'react';

import styles from './Footer.module.scss';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer className={styles.Footer}>
      created by Michal Motai &nbsp;&nbsp;
      <a href="mailto:michal.motei@gmail.com">mail me</a>
    </footer>
  );
};

export default Footer;
