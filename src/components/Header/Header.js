import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from "../Navigation/Navigation";

function Header({ menuIsOpened, openMenu, closeMenu, isProfilePageActive }) {

  return(
    <header className={`header ${isProfilePageActive && "header__theme_white"}`}>
      <NavLink to="/"><img src={logo} alt="Логотип Movie Explorer" className="header__logo"/></NavLink>

      <div className="header__wrapper">
        <NavLink to="/signup" className="header__register">{isProfilePageActive ? '' : 'Регистрация'}</NavLink>
        <NavLink to="signin" className={`header__button ${isProfilePageActive && "header__button_hidden"}`}>Войти</NavLink>
        <button className={`header__button-burger ${!isProfilePageActive && "header__button-burger_white"}`} onClick={openMenu}/>
        <Navigation menuIsOpened={menuIsOpened} closeMenu={closeMenu}/>
      </div>
    </header>
  );
}

export default Header;
