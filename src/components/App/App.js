import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
  // Хуки, стейты
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="page">

      <Switch>

        <Route exact path="/">
          <Main />
        </Route>

        <Route exact path="/signin">
          <Login />
        </Route>

        <Route exact path="/signup">
          <Register />
        </Route>

        {/*<Route exact path="/movies">*/}
        {/*  <Movies />*/}
        {/*</Route>*/}

        {/*<Route exact path="/saved-movies">*/}
        {/*  <SavedMovies />*/}
        {/*</Route>*/}

        {/*<Route exact path="/profile">*/}
        {/*  <Profile />*/}
        {/*</Route>*/}

        <Route path="*">
          <NotFoundPage />
        </Route>

      </Switch>

    </div>
  );
}

export default App;
