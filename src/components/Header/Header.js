import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from "../Navigation/Navigation";

function Header({ menuIsOpened, openMenu, closeMenu, isProfilePageActive, loggedIn }) {

  return(
    <header className={`header ${isProfilePageActive && "header__theme_white"} ${loggedIn && "header_type_logged-in"}`}>
      <NavLink to="/"><img src={logo} alt="Логотип Movie Explorer" className="header__logo"/></NavLink>

      {
        loggedIn ? (
          <div className="header__wrapper">
            <div className="header__menu-wrapper">
              <div className="header__menu-links-wrapper">
                <NavLink to="/movies"
                         className={`navigation__link navigation__link_is-active navigation__link_theme_dark
                         ${!isProfilePageActive && "navigation__link_theme_white navigation__link_is-active_theme_white"}`}
                         onClick={closeMenu}
                >Фильмы</NavLink>
                <NavLink to="/saved-movies"
                         className={`navigation__link navigation__link_theme_dark
                         ${!isProfilePageActive && "navigation__link_theme_white"}`}
                         onClick={closeMenu}
                >Сохраненные фильмы</NavLink>
              </div>
              <NavLink to="/profile" className="navigation__account navigation__account_theme_dark" onClick={closeMenu}>Аккаунт</NavLink>
            </div>
            <button className={`header__button-burger ${!isProfilePageActive && "header__button-burger_white"}`} onClick={openMenu}/>
            <Navigation menuIsOpened={menuIsOpened} closeMenu={closeMenu}/>
          </div>
        ) : (
          <div className={`header__wrapper ${isProfilePageActive && "header__button_hidden"}`}>
            <NavLink to="/signup" className="header__register">Регистрация</NavLink>
            <NavLink to="signin" className="header__button">Войти</NavLink>
          </div>
        )
      }
    </header>
  );
}

export default Header;
