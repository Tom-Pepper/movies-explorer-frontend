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
import Validator from "../../utils/Validator";

function App() {

  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // Хуки, стейты
  const { handleOnChange, setIsValid, isValid, error, regData } = Validator();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const [menuIsOpened, setMenuIsOpened] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [submitError, setSubmitError] = useState('');

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
          } else {
            localStorage.removeItem('isLoggedIn');
            setLoggedIn(false);
          }
        })
        .catch((err) => console.log(`Произошла ошибка ${err.status}`));
    }
  }, [loggedIn]);

  /**
   * Регистрация нового пользователя
   */
  function handleRegister(data) {
    const { name, email, password } = data;
    setIsValid(false);
    setIsLoading(true);

    return register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(data);
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err.status}`);
        setSubmitError(err.status);
        history.push('/signup');
      })
      .finally(() => setIsLoading(false));
  }

  /**
   * Авторизация пользователя
   */
  function handleLogin(data) {
    const { email, password } = data;
    setIsValid(false);
    setIsLoading(true);

    return login(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('isLoggedIn', true);
          setLoggedIn(localStorage.getItem('isLoggedIn'));
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
        setSubmitError(err.status);
      })
      .finally(() => setIsLoading(false));
  }

  /**
   * Выход из учетной записи
   */
  function handleLogout(evt) {
    evt.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('isLoggedIn');
    setLoggedIn(localStorage.getItem('isLoggedIn'));
    history.push('/');
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
            <Login
              submitHandler={handleLogin}
              regData={regData}
              isLoading={isLoading}
              handleOnChange={handleOnChange}
              error={error}
              isValid={isValid}
              submitError={submitError}
            />
          </Route>

          <Route exact path="/signup">
            <Register
              submitHandler={handleRegister}
              regData={regData}
              isLoading={isLoading}
              handleOnChange={handleOnChange}
              error={error}
              isValid={isValid}
              submitError={submitError}
            />
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
              logoutHandler={handleLogout}
              submitError={submitError}
              username={currentUser.name}
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
