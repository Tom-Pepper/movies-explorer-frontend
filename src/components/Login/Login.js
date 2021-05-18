import React from 'react';

import './Login.css';
import {NavLink} from "react-router-dom";
import logo from "../../images/logo.svg";
import Form from "../Form/Form";
import Input from "../Input/Input";

function Login({
                 submitHandler,
                 regData,
                 isLoading,
                 handleOnChange,
                 error,
                 isValid,
                 submitError,
               }) {

  const formHandler = (evt) => {
    evt.preventDefault();
    submitHandler(regData);
  }

  /**
   * Обработка статуса ошибок для передачи ошибки в валидацию
   */
  const errorStatus = (status) => {
    if(status === 400) {
      return "Некорректный логин или пароль"
    }
    if(status === 429) {
      return "Превышен лимит запросов"
    }
    if(status === 500) {
      return "Произошла ошибка на сервере"
    }
    if(status === 404) {
      return "Страница не найдена"
    }
    if(status === 401) {
      return "Произошла ошибка авторизации. Проверьте правильность введенных данных"
    }
  }

  const errorMsg = errorStatus(submitError);

  return(
    <div className="login register">
      <NavLink to="/"><img src={logo} alt="Логотип Movie Explorer" className="header__logo register__header"/></NavLink>
      <h2 className="register__title">Рады видеть!</h2>
      <Form
        buttonText="Войти"
        text="Еще не зарегистрированы?"
        url="/signup"
        linkText="Регистрация"
        submitHandler={formHandler}
        errorMsg={errorMsg}
        isLoading={isLoading}
        isValid={isValid}
      >
        <Input
          id="user-email"
          type="email"
          name="email"
          inputTitle="E-mail"
          minLength="7"
          maxLength="200"
          errorText={error.email}
          onChange={handleOnChange}
          regData={regData.email}
        />
        <Input
          id="user-password"
          type="password"
          name="password"
          inputTitle="Пароль"
          minLength="8"
          maxLength="200"
          errorText={error.password}
          onChange={handleOnChange}
          regData={regData.password}
        />
      </Form>
    </div>
  );
}

export default Login;
