import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyPress = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal}>
        <img className={styles.modalImg} src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
