import React from 'react';

import './Movies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "./Search/Search";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies(props) {
  return(
    <section className="movies">
      <Header
        loggedIn={props.loggedIn}
        isProfilePageActive={true}
        menuIsOpened={props.menuIsOpened}
        openMenu={props.openMenu}
        closeMenu={props.closeMenu}
      />
      <div className="movies__search-wrapper">
        <Search
          onSearchMovies={props.onSearchMovies}
          onShortMoviesCheck={props.onShortMoviesCheck}
          saved={false}
          isChecked={props.isShortMovieChecked}
        />
      </div>
      <FilterCheckbox
        checkboxName={'Короткометражки'}
        onChange={props.onShortMoviesCheck}
        isChecked={props.isChecked}
      />
      <MoviesCardList
        movies={props.movies}
        isSearching={props.isSearching}
        notFound={props.notFound}
        isErrorActive={props.isErrorActive}
        isBookmarkPage={props.isBookmarkPage}
        onMovieSave={props.onMovieSave}
        onDeleteMovie={props.onDeleteMovie}
        saved={false}
        savedMovies={props.savedMovies}
        isMobile={props.isMobile}
        isTablet={props.isTablet}
        isShortMovieChecked={props.isShortMovieChecked}
      />
      <div className="movies__footer-wrapper">
        <Footer moviesPage={true}/>
      </div>
    </section>
  );
}

export default Movies;
