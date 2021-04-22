import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';

import './App.css';

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
    </div>
  );
}

export default App;
