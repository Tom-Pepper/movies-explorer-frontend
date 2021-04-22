import React from 'react';

import logo from '../../images/logo.svg';
import './Header.css';

function Header() {
  return(
    <header className="header">
      <img src={logo} alt="Логотип Movie Explorer" className="header__logo"/>
      <div className="header__wrapper">
        <p className="header__login-info">Регистрация</p>
        <button className="header__button">Войти</button>
      </div>
    </header>
  );
}

export default Header;
