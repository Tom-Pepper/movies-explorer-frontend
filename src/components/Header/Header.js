import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../images/logo.svg';
import './Header.css';

function Header() {
  return(
    <header className="header">
      <NavLink to="/"><img src={logo} alt="Логотип Movie Explorer" className="header__logo"/></NavLink>

      <div className="header__wrapper">
        <NavLink to="/signup" className="header__register">Регистрация</NavLink>
        <NavLink to="signin" className="header__button">Войти</NavLink>
      </div>
    </header>
  );
}

export default Header;
