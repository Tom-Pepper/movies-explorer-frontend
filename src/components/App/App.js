import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoute";

function App() {
  // Хуки, стейты
  const [loggedIn, setLoggedIn] = useState(true);

  const [menuIsOpened, setMenuIsOpened] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  /**
   * Функция открытия бургер-меню
   */
  function handleOpenMenu() {
    setMenuIsOpened(true);
    window.addEventListener('click', handleClosePopupWithOverlayClick);
  }

  /**
   * Функция закрытия бургер-меню
   */
  function handleCloseMenu() {
    setMenuIsOpened(false);
    window.removeEventListener('click', handleClosePopupWithOverlayClick);
  }

  /**
   * Функция закрытия бургер-меню по клику на оверлей
   * @param evt — событие, где отслеживается клик
   */
  function handleClosePopupWithOverlayClick(evt) {
    if (evt.target.classList.contains('navigation__wrapper')) {
      handleCloseMenu();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Switch>

          <Route exact path="/">
            <Main
              loggedIn={loggedIn}
              menuIsOpened={menuIsOpened}
              openMenu={handleOpenMenu}
              closeMenu={handleCloseMenu}
            />
          </Route>

          <Route exact path="/signin">
            <Login />
          </Route>

          <Route exact path="/signup">
            <Register />
          </Route>

          <Route exact path="/movies">
            <Movies
              loggedIn={loggedIn}
              menuIsOpened={menuIsOpened}
              openMenu={handleOpenMenu}
              closeMenu={handleCloseMenu}
            />
          </Route>

          <Route exact path="/saved-movies">
            <SavedMovies
              loggedIn={loggedIn}
              menuIsOpened={menuIsOpened}
              openMenu={handleOpenMenu}
              closeMenu={handleCloseMenu}
            />
          </Route>

          <Route exact path="/profile">
            <Profile
              loggedIn={loggedIn}
              menuIsOpened={menuIsOpened}
              openMenu={handleOpenMenu}
              closeMenu={handleCloseMenu}
            />
          </Route>

          <Route path="*">
            <NotFoundPage />
          </Route>

        </Switch>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
