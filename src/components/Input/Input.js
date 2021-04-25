import React from 'react';

import './Input.css';

function Input({ type, id, inputTitle, name, minLength, maxLength, errorText }) {
  return(
    <div className="input">
      <p className="input__label">{inputTitle}</p>
      <input
        required
        className="input__field"
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
