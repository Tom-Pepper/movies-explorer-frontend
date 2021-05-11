import React from 'react';

import './Movies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "./Search/Search";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ menuIsOpened, openMenu, closeMenu, isBookmarkPage, loggedIn }) {
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
        <Search />
      </div>
      <FilterCheckbox checkboxName={'Короткометражки'}/>
      <MoviesCardList isBookmarkPage={isBookmarkPage}/>
      <div className="movies__footer-wrapper">
        <Footer moviesPage={true}/>
      </div>
    </section>
  );
}

export default Movies;
