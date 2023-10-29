import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ setQuery }) => {
  const [query, setQueryValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setQuery(query);
    setQueryValue('');
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={e => setQueryValue(e.target.value)}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={styles.searchBtn}>
          <span className="button-label">Search</span>
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default Searchbar;
