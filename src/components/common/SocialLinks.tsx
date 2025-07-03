import Image from 'next/image';
import React from 'react';
import { SOCIAL_URLS } from '@constants/config';
import styles from '@styles/scss/SocialLinks.module.scss';

const SocialLinks = () => {
  return (
    <div className={styles.socialIcons}>
      {Object.keys(SOCIAL_URLS).map((socialName, i) => (
        <a key={i} href={SOCIAL_URLS[socialName]} target="_blank" rel="noopener noreferrer">
          <Image src={`/assets/${socialName}.png`} alt={socialName} width={16} height={16} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
