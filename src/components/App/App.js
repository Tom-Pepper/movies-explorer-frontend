import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';

import './App.css';
import Footer from "../Footer/Footer";
import Register from "../Register/Register";

function App() {
  // Хуки, стейты
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="page">

      <Switch>

        <Route exact path="/">
          <Main />
        </Route>

        {/*<Route exact path="/signin">*/}
        {/*  <Login />*/}
        {/*</Route>*/}

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

      </Switch>

    </div>
  );
}

export default App;
