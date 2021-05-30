import React from 'react';

import './SavedMovies.css';
import Movies from "../Movies/Movies";

function SavedMovies(props) {
  return(
    <Movies
      loggedIn={props.loggedIn}
      isProfilePageActive={true}
      isBookmarkPage={true}
      menuIsOpened={props.menuIsOpened}
      openMenu={props.openMenu}
      closeMenu={props.closeMenu}
      onSubmit={props.onSubmit}
      onChange={props.onChange}
      searchValue={props.searchValue}
    />
  );
}

export default SavedMovies;
