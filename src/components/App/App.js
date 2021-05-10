import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  // Хуки, стейты
  const [loggedIn, setLoggedIn] = useState(true);

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
    if (evt.target.classList.contains('navigation__wrapper')) {
      handleCloseMenu();
    }
  }

  return (
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
  );
}

export default App;
