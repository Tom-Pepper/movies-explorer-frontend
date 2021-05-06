import React from 'react';

import './Navigation.css';
import {NavLink} from "react-router-dom";

function Navigation({ menuIsOpened, closeMenu }) {
  return(
    <div className={`navigation__wrapper ${!menuIsOpened && "navigation__wrapper_hidden"}`}>
      <nav className="navigation">
        <ul className="navigation__links">
          <li className="navigation__link-wrapper">
            <NavLink to="/" className="navigation__link" onClick={closeMenu}>Главная</NavLink>
          </li>
          <li className="navigation__link-wrapper">
            <NavLink to="/movies" className="navigation__link navigation__link_is-active" onClick={closeMenu}>Фильмы</NavLink>
          </li>
          <li className="navigation__link-wrapper">
            <NavLink to="/saved-movies" className="navigation__link" onClick={closeMenu}>Сохраненные фильмы</NavLink>
          </li>
        </ul>
        <NavLink to="/profile" className="navigation__account" onClick={closeMenu}>Аккаунт</NavLink>
      </nav>
      <div className="navigation__close-button" onClick={closeMenu}/>
    </div>
  );
}

export default Navigation;
