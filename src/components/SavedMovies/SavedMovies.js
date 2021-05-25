import React from 'react';

import './SavedMovies.css';
import Movies from "../Movies/Movies";
import Header from "../Header/Header";
import Search from "../Movies/Search/Search";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  return(
    // <Movies
    //   loggedIn={loggedIn}
    //   isProfilePageActive={true}
    //   isBookmarkPage={true}
    //   menuIsOpened={menuIsOpened}
    //   openMenu={openMenu}
    //   closeMenu={closeMenu}
    // />
    <section className="movies saved-movies">

      <Header
        loggedIn={props.loggedIn}
        isProfilePageActive={true}
        menuIsOpened={props.menuIsOpened}
        openMenu={props.openMenu}
        closeMenu={props.closeMenu}
      />

      <div className="movies__search-wrapper">
        <Search
          onSubmit={props.onSubmit}
          onChange={props.onChange}
          handleCheck={props.handleShortCheck}
          searchValue={props.searchValue}
        />
      </div>

      <FilterCheckbox
        checkboxName={'Короткометражки'}
        handleCheck={props.handleShortCheck}
      />

      <MoviesCardList
        isInBookmark={true}
        movies={props.movies}
        savedMovies={props.savedMovies}
        searchError={props.searchError}
        onDeleteMovie={props.onDeleteMovie}
        isShortMovie={props.isShortMovie}
      />

      <div className="movies__footer-wrapper">
        <Footer moviesPage={true} />
      </div>
    </section>
  );
}

export default SavedMovies;
