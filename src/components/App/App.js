import React, {useEffect, useState} from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {register, login, updateProfile, checkAuth} from "../../utils/MainApi";
import { getMovies, getBookmarkedMovies, unBookMarkMovie, bookmarkMovie } from "../../utils/MoviesApi";

import Validator from "../../utils/Validator";

function App() {

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const storedMovies = JSON.parse(localStorage.getItem("storedMovies"));
  const savedMoviesInStore = JSON.parse(localStorage.getItem("savedMovies"));
  const { handleOnChange, errors, values, isValid, setIsValid } = Validator();

  // Хуки, стейты
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const [menuIsOpened, setMenuIsOpened] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [submitError, setSubmitError] = useState('');

  const [searchValue, setSearchValue] = React.useState("");

  const [movies, setMovies] = React.useState(storedMovies);

  const [savedMovies, setSavedMovies] = React.useState(savedMoviesInStore);

  const [searchError, setSearchError] = React.useState("");

  const [isShortMovie, setIsShortMovie] = React.useState(false);

  const history = useHistory();

  /**
   * Проверка токена и установка текущего пользователя
   */
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      checkAuth(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            history.push('/')
          }
        })
        .catch((err) => console.log(`Произошла ошибка ${err}`));
    }
  }, []);

  // ============== Блок регистрации, авторизации и редактрования данных пользователя =============================

  /**
   * Регистрация нового пользователя
   */
  function handleRegister(data) {
    setIsLoading(true);
    setIsValid(true);
    register(data.username, data.email, data.password)
      .then(() => {
        handleLogin(data);
        setCurrentUser(data.username);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
        setSubmitError(err);
      })
      .finally(() => setIsLoading(false));
  }

  /**
   * Авторизация пользователя
   */
  function handleLogin(data) {
    setIsLoading(true);
    setIsValid(true);
    login(data.email, data.password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setCurrentUser(data.username);
          localStorage.setItem('jwt', res.token);
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
        setSubmitError(err);
      })
      .finally(() => {
        setIsLoading(false);
        history.push('/movies');
      });
  }

  /**
   * Выход из учетной записи
   */
  function handleLogout(evt) {
    evt.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('storedMovies');
    setLoggedIn(false);
    history.push('/');
  }

  /**
   * Функция редактирования данных профиля
   */
  function handleEditProfile(data, setIsEditing, setPopupIsOpened) {
    updateProfile(data.name, data.email)
      .then((res) => setCurrentUser(res))
      .catch((err) => {
        console.log(`Произошла ошибка ${err.status}`);
        setSubmitError(err.status);
      })
      .finally(() => {
        setIsLoading(false);
        setIsEditing(false);
        setPopupIsOpened(true);
      });
  }

  // ============== Блок обработчиков =============================


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

  // ============== Рендеринг =============================
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
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login
                onLogin={handleLogin}
                values={values}
                isLoading={isLoading}
                handleOnChange={handleOnChange}
                errors={errors}
                isValid={isValid}
                submitError={submitError}
              />
            )}
          </Route>

          <Route exact path="/signup">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register
                onRegister={handleRegister}
                handleOnChange={handleOnChange}
                values={values}
                isLoading={isLoading}
                errors={errors}
                isValid={isValid}
                submitError={submitError}
              />
            )}
          </Route>

          <Route exact path="/movies">
            <Movies
              loggedIn={loggedIn}
              menuIsOpened={menuIsOpened}
              openMenu={handleOpenMenu}
              closeMenu={handleCloseMenu}
              user={currentUser}
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
              logoutHandler={handleLogout}
              submitError={submitError}
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
