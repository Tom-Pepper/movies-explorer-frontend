import React from 'react';

import './Form.css';
import {NavLink} from "react-router-dom";

function Form({ name, buttonText, linkText, url, text, children, onSubmit, isValid, errorMsg }) {
  return(
    <form
      name={name}
      className="form"
      onSubmit={onSubmit}
      noValidate
    >

      { children }

      <span className={`input__error ${errorMsg && "input__error_visible"}`}>
        {errorMsg}
      </span>
      <span className={`input__error ${!isValid && "input__error_visible"}`}>
        Одно из полей не заполнено или заполнено не корректно
      </span>
      <button className={`form__button ${!isValid && 'form__button_disabled'}`} disabled={!isValid}>
        {buttonText}
      </button>
      <div className="form__subText-wrapper">
        <p className="form__text">{text}</p>
        <NavLink to={url} className="form__link">{linkText}</NavLink>
      </div>
    </form>
  );
}

export default Form;
