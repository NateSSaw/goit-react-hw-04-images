import { useState } from 'react';
import css from './Searchbar.module.css';
import Notify from 'notiflix';
import PropTypes from 'prop-types';
export default function Searchbar({ handleSearch }) {
  const [query, setQuery] = useState('');

  const handleGetQuery = ({ target: { value } }) => {
    setQuery(value.toLowerCase());
  };

  const handleSearchQuery = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      Notify.warning('Search query cannot be empty');
      return;
    }
    handleSearch(query);
    setQuery('');
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSearchQuery}>
        <button type="submit" className={css.SearchForm__button}>
          <span className={css.SearchForm__label}>Search</span>
        </button>

        <input
          className={css.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleGetQuery}
          value={query}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  handlSearch: PropTypes.func,
};
