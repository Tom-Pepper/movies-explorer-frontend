import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";

function App() {
  // Хуки, стейты
  const [loggedIn, setLoggedIn] = useState(false);

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

  return (
    <div className="page">

      <Switch>

        <Route exact path="/">
          <Main
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
            menuIsOpened={menuIsOpened}
            openMenu={handleOpenMenu}
            closeMenu={handleCloseMenu}
          />
        </Route>

        {/*<Route exact path="/saved-movies">*/}
        {/*  <SavedMovies />*/}
        {/*</Route>*/}

        <Route exact path="/profile">
          <Profile
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
  );
}

export default App;
