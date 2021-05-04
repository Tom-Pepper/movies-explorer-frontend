import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../images/logo.svg';
import './Header.css';

function Header() {

  const [menuIsOpened, setMenuIsOpened] = useState(false);

  function handleOpenMenu() {
    setMenuIsOpened(true);
    window.addEventListener('click', handleClosePopupWithOverlayClick);
  }

  function handleCloseMenu() {
    setMenuIsOpened(false);
    window.removeEventListener('click', handleClosePopupWithOverlayClick);
  }

  function handleClosePopupWithOverlayClick(evt) {
    if (evt.target.classList.contains('header__menu-wrapper')) {
      handleCloseMenu();
    }
  }

  return(
    <header className="header">
      <NavLink to="/"><img src={logo} alt="Логотип Movie Explorer" className="header__logo"/></NavLink>

      <div className="header__wrapper">
        <NavLink to="/signup" className="header__register">Регистрация</NavLink>
        <NavLink to="signin" className="header__button">Войти</NavLink>
        <button className="header__button-burger" onClick={handleOpenMenu}/>
      </div>

      <div className={`header__menu-wrapper ${!menuIsOpened && "header__menu-wrapper_hidden"}`}>
        <nav className="header__menu">
          <ul className="header__menu-links">
            <li className="header__menu-link-wrapper">
              <NavLink to="/" className="header__menu-link" onClick={handleCloseMenu}>Главная</NavLink>
            </li>
            <li className="header__menu-link-wrapper">
              <NavLink to="/movies" className="header__menu-link header__menu-link_is-active" onClick={handleCloseMenu}>Фильмы</NavLink>
            </li>
            <li className="header__menu-link-wrapper">
              <NavLink to="/saved-movies" className="header__menu-link" onClick={handleCloseMenu}>Сохраненные фильмы</NavLink>
            </li>
          </ul>
          <NavLink to="/account" className="header__account" onClick={handleCloseMenu}>Аккаунт</NavLink>
        </nav>
        <div className="header__menu-close-button" onClick={handleCloseMenu}/>
      </div>
    </header>
  );
}

export default Header;
