import React from 'react';

import './Movies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "../Search/Search";
import Checkbox from "../Checkbox/Checkbox";

function Movies({ menuIsOpened, openMenu, closeMenu }) {
  return(
    <section className="movies">
      <Header
        isProfilePageActive={true}
        menuIsOpened={menuIsOpened}
        openMenu={openMenu}
        closeMenu={closeMenu}
      />
      <div className="movies__search-wrapper">
        <Search />
      </div>
      <Checkbox checkboxName={'Короткометражки'}/>
      <div className="movies__footer-wrapper">
        <Footer moviesPage={true}/>
      </div>

    </section>
  );
}

export default Movies;
