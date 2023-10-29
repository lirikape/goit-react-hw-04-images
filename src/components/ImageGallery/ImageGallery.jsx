import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={styles.gallery}>
    {images?.map(image => (
      <ImageGalleryItem
        key={image.id}
        webformatURL={image.webformatURL}
        largeImageURL={image.largeImageURL}
        onClick={() => onImageClick(image.largeImageURL)}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired, // Визначте проптайп для images
  onImageClick: PropTypes.func.isRequired, // Визначте проптайп для onImageClick
};

export default ImageGallery;
