import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Spinner = () => (
  <div className={styles.spinnerContainer}>
    <CirclesWithBar
      height="100"
      width="100"
      color="#229091"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      outerCircleColor=""
      innerCircleColor=""
      barColor=""
      ariaLabel="circles-with-bar-loading"
    />
  </div>
);

export default Spinner;
