import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={onLoadMore} className={styles.LoadMore}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
