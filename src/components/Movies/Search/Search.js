import React from 'react';

import './Search.css';

function Search() {
  return(
    <form className="search" name="search">
      <input type="text" placeholder="Фильм" className="search__input"/>
      <button className="search__input-button"/>
    </form>
  );
}

export default Search;
