import React from 'react';

import './Movies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "./Search/Search";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ loggedIn, menuIsOpened, openMenu, closeMenu,
                  onSubmit, onChange, handleShortCheck, searchValue,
                  searchError, isShortMovie, movies, isLoading, onSaveMovie }) {
  return(
    <section className="movies">

      <Header
        loggedIn={loggedIn}
        isProfilePageActive={true}
        menuIsOpened={menuIsOpened}
        openMenu={openMenu}
        closeMenu={closeMenu}
      />

      <div className="movies__search-wrapper">
        <Search
          onSubmit={onSubmit}
          onChange={onChange}
          handleCheck={handleShortCheck}
          searchValue={searchValue}
        />
      </div>

      <FilterCheckbox
        checkboxName={'Короткометражки'}
        handleCheck={handleShortCheck}
      />

      <MoviesCardList
        isInBookmark={false}
        movies={movies}
        isLoading={isLoading}
        searchError={searchError}
        onSaveMovie={onSaveMovie}
        isShortMovie={isShortMovie}
      />

      <div className="movies__footer-wrapper">
        <Footer moviesPage={true} />
      </div>
    </section>
  );
}

export default Movies;
