import React, { Component } from 'react';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    query: '',
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.setQuery(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            value={this.state.query}
            onChange={e => this.setState({ query: e.target.value })}
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
  }
}

Searchbar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default Searchbar;
