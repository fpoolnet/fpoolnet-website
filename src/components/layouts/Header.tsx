import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LanguageSwitcher from '@components/common/LanguageSwitcher';
import SocialLinks from '@components/common/SocialLinks';
import styles from '@styles/scss/Header.module.scss';

const Header = () => {
  return (
    <AppBar position="fixed" className={styles.header}>
      <Toolbar disableGutters className={styles.toolbar}>
        <Box>
          <Link href="https://fpool.net" passHref>
            <Image
              src="/assets/icon.svg"
              alt="Mobile Logo"
              className={styles.mobileLogo}
              width={60}
              height={60}
            />
          </Link>
          <Link href="https://fpool.net" passHref>
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              className={styles.logo}
              width={128}
              height={64}
            />
          </Link>
        </Box>
        <div className={styles.rightContent}>
          <SocialLinks />
          <LanguageSwitcher />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
