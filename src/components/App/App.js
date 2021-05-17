import React, {useEffect, useState} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { register, login, updateProfile, getProfile } from "../../utils/MainApi";
import { getMovies, getBookmarkedMovies, unBookMarkMovie, bookmarkMovie } from "../../utils/MoviesApi";

function App() {

  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // Хуки, стейты
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const [menuIsOpened, setMenuIsOpened] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  /**
   * Проверка токена и установка текущего пользователя
   */
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      getProfile(token)
        .then((res) => {
          if (res) {
            const loggedIn = localStorage.getItem('isLoggedIn');
            setLoggedIn(loggedIn);
            setCurrentUser(res);
          }
          localStorage.removeItem('isLoggedIn');
          setLoggedIn(false);
        })
        .then((err) => console.log(`Произошла ошибка ${err.status}`));
    }
  }, [loggedIn]);

  /**
   * Регистрация пользователя
   */
  function handleRegister(data) {

  }

  // Обработчики

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

          <ProtectedRoute
            exact path="/"
            component={Main}
            loggedIn={loggedIn}
            menuIsOpened={menuIsOpened}
            openMenu={handleOpenMenu}
            closeMenu={handleCloseMenu}
          />

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
