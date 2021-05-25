import React from 'react';

import './Search.css';

function Search(props) {
  return(
    <form
      onSubmit={props.onSubmit}
      className="search"
      name="search"
      noValidate
    >
      <input
        type="text"
        placeholder="Фильм"
        className="search__input"
        value={props.searchValue || ''}
        onChange={props.onChange}
        required
      />
      <button
        type="submit"
        className="search__input-button"
      />
    </form>
  );
}

export default Search;
