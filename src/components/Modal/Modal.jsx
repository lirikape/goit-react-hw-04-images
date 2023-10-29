import React, { Component } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, onClose } = this.props;

    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal}>
          <img className={styles.modalImg} src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
