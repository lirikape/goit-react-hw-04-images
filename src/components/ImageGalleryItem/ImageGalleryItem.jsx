import React from 'react';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, onClick }) => (
  <li className={styles.galleryItem}>
    <img
      src={webformatURL}
      alt=""
      className={styles.imageSmall}
      onClick={onClick}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
