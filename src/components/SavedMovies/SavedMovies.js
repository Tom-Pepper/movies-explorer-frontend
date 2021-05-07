import React from 'react';

import './SavedMovies.css';
import Movies from "../Movies/Movies";

function SavedMovies({ menuIsOpened, openMenu, closeMenu }) {
  return(
    <Movies
      isProfilePageActive={true}
      isBookmarkPage={true}
      menuIsOpened={menuIsOpened}
      openMenu={openMenu}
      closeMenu={closeMenu}
    />
  );
}

export default SavedMovies;
