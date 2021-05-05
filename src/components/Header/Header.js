import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../images/logo.svg';
import './Header.css';

function Header({ menuIsOpened, openMenu, closeMenu, isProfilePageActive }) {

  return(
    <header className={`header ${isProfilePageActive && "header__theme_white"}`}>
      <NavLink to="/"><img src={logo} alt="Логотип Movie Explorer" className="header__logo"/></NavLink>

      <div className="header__wrapper">
        <NavLink to="/signup" className="header__register">{isProfilePageActive ? '' : 'Регистрация'}</NavLink>
        <NavLink to="signin" className={`header__button ${isProfilePageActive && "header__button_hidden"}`}>Войти</NavLink>
        <button className="header__button-burger" onClick={openMenu}/>
      </div>

      <div className={`header__menu-wrapper ${!menuIsOpened && "header__menu-wrapper_hidden"}`}>
        <nav className="header__menu">
          <ul className="header__menu-links">
            <li className="header__menu-link-wrapper">
              <NavLink to="/" className="header__menu-link" onClick={closeMenu}>Главная</NavLink>
            </li>
            <li className="header__menu-link-wrapper">
              <NavLink to="/movies" className="header__menu-link header__menu-link_is-active" onClick={closeMenu}>Фильмы</NavLink>
            </li>
            <li className="header__menu-link-wrapper">
              <NavLink to="/saved-movies" className="header__menu-link" onClick={closeMenu}>Сохраненные фильмы</NavLink>
            </li>
          </ul>
          <NavLink to="/profile" className="header__account" onClick={closeMenu}>Аккаунт</NavLink>
        </nav>
        <div className="header__menu-close-button" onClick={closeMenu}/>
      </div>
    </header>
  );
}

export default Header;
