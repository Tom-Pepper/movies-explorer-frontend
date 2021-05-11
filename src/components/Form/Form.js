import React from 'react';

import './Form.css';
import {NavLink} from "react-router-dom";

function Form({ name, buttonText, linkText, url, text, children }) {
  return(
    <form name={name} method="post" className="form" noValidate>
      { children }
      <button className="form__button">{buttonText}</button>
      <div className="form__subText-wrapper">
        <p className="form__text">{text}</p>
        <NavLink to={url} className="form__link">{linkText}</NavLink>
      </div>
    </form>
  );
}

export default Form;
