import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '@styles/scss/Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer} style={{ display: 'flex', alignItems: 'center' }}>
      <p style={{ flex: 1, textAlign: 'center' }}>{t('footer.title')}</p>
    </footer>
  );
};

export default Footer;
