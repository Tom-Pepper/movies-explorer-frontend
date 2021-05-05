import React from 'react';

import './Movies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "../Search/Search";

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
      <div className="movies__footer-wrapper">
        <Footer />
      </div>
    </section>
  );
}

export default Movies;
