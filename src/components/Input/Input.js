import React from 'react';

import './Input.css';

function Input({ type, id, inputTitle, name, minLength, maxLength, errorText }) {
  return(
    <div className="input">
      <label className="input__label">{inputTitle}</label>
      <input
        required
        className={`input__field ${errorText && "input__field_state_error"}`}
        type={type}
        id={id}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
      />
      <span className={`input__error ${errorText && "input__error_visible"}`}>
        {errorText}
      </span>
    </div>
  );
}

export default Input;
