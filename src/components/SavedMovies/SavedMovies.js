import React from 'react';

import './SavedMovies.css';
import Header from "../Header/Header";
import Movies from "../Movies/Movies";

function SavedMovies({ menuIsOpened, openMenu, closeMenu }) {
  return(
    <Movies
      isProfilePageActive={true}
      menuIsOpened={menuIsOpened}
      openMenu={openMenu}
      closeMenu={closeMenu}
    />
  );
}

export default SavedMovies;
