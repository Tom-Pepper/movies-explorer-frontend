import React from 'react';

import './Register.css';
import logo from "../../images/logo.svg";

import { NavLink } from "react-router-dom";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { useFormWithValidation } from "../../utils/formValidator";

function Register(props) {

  const { values, handleChange, errors, isFormValid } = useFormWithValidation();

  function handleRegister(evt) {
    evt.preventDefault();
    props.onRegister(values.name, values.password, values.email);
    props.onClear();
  }

  return(
    <div className="register">
      <NavLink to="/"><img src={logo} alt="Логотип Movie Explorer" className="header__logo register__header"/></NavLink>
      <h2 className="register__title">Добро пожаловать!</h2>
      <Form
        buttonText={props.isSaving ? "Загружаемся..." : "Зарегистрироваться"}
        text="Уже зарегистрированы?"
        url="/signin"
        linkText="Войти"
        onSubmit={handleRegister}
        disabled={isFormValid}
        onClear={props.onClear}
        errorMsg={props.errorMessage}
      >
        <Input
          type="text"
          name="name"
          inputTitle="Имя"
          minLength="2"
          maxLength="20"
          errorText={errors.name}
          value={values.name || ''}
          onChange={handleChange}
          isValid={isFormValid}
        />
        <Input
          type="email"
          name="email"
          inputTitle="E-mail"
          minLength="7"
          maxLength="200"
          errorText={errors.email}
          value={values.email || ''}
          onChange={handleChange}
          isValid={isFormValid}
        />
        <Input
          type="password"
          name="password"
          inputTitle="Пароль"
          minLength="8"
          maxLength="200"
          errorText={errors.password}
          value={values.password || ''}
          onChange={handleChange}
          isValid={isFormValid}
        />
      </Form>
    </div>
  );
}

export default Register;
