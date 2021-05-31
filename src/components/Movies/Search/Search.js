import React, {useState} from 'react';

import './Search.css';

function Search(props) {

  const [search, setSearch] = useState('');
  const [isSearchValid, setIsSearchValid] = useState(true);

  function handleSearchChange(evt) {
    setSearch(evt.target.value);
    setIsSearchValid(evt.target.checkValidity());
  }

  function handleSearchSavedMovies(evt) {
    evt.preventDefault();
    props.onSearchSavedMovies(search); //Пропс прокидывается из Movies через SavedMovies
  }

  function handleSearchMovies(evt) {
    evt.preventDefault();
    props.onSearchMovies(search);
  }

  return(
    <>
      <form
        className="search"
        name="search-form"
        onSubmit={props.saved ? handleSearchSavedMovies : handleSearchMovies}
      >
        <input
          className="search__input"
          type="text"
          name="search"
          placeholder="Фильм"
          value={search || ''}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search__input-button"/>
      </form>
      <span className={`input__error ${!isSearchValid && "input__error_visible"}`}>Введите название фильма</span>
    </>
  );
}

export default Search;
