/**
 * Защищенный роут. Любого незалогиненного пользователя автоматически редиректит
 * на страницу логина на основании пропса @loggedIn
 */

import React from "react";
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    </Route>
  );
};

export default ProtectedRoute;
