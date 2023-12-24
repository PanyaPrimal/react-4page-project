import { faGithub, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className='social-icons d-flex gap-4'>
        <a href='https://github.com/PanyaPrimal'>
          <FontAwesomeIcon color='var(--forest)' icon={faGithub} size='2x' />
        </a>
        <a href='mailto:viktor.panikar.dev@gmail.com'>
          <FontAwesomeIcon color='var(--forest)' icon={faEnvelope} size='2x' />
        </a>
        <a href='tel:#'>
          <FontAwesomeIcon color='var(--forest)' icon={faPhoneAlt} size='2x' />
        </a>
        <a href='#'>
          <FontAwesomeIcon color='var(--forest)' icon={faTelegram} size='2x' />
        </a>
        <a href='https://www.linkedin.com/in/viktor-panikar/'>
          <FontAwesomeIcon color='var(--forest)' icon={faLinkedin} size='2x' />
        </a>
      </div>
      <p className='fs-4 fw-normal'>&copy; 2023 Viktor's Website</p>
    </footer>
  );
};

export default Footer;