import React from 'react';

import './Login.css';
import {NavLink} from "react-router-dom";
import logo from "../../images/logo.svg";
import Form from "../Form/Form";
import Input from "../Input/Input";

function Login() {
  return(
    <div className="login register">
      <NavLink to="/"><img src={logo} alt="Логотип Movie Explorer" className="header__logo register__header"/></NavLink>
      <h2 className="register__title">Рады видеть!</h2>
      <Form
        buttonText="Войти"
        text="Еще не зарегистрированы?"
        url="/signup"
        linkText="Регистрация"
      >
        <Input
          id="user-email"
          type="email"
          name="email"
          inputTitle="E-mail"
          minLength="7"
          maxLength="200"
          errorText=""
        />
        <Input
          id="user-password"
          type="password"
          name="password"
          inputTitle="Пароль"
          minLength="8"
          maxLength="200"
          errorText="Что-то пошло не так..."
        />
      </Form>
    </div>
  );
}

export default Login;
