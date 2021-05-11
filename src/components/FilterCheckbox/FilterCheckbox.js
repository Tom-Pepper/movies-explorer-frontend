import React from 'react';

import './FilterCheckbox.css';

function FilterCheckbox({ checkboxName }) {
  return(
    <div className="checkbox__wrapper">
      <label className="checkbox">
        <input type="checkbox" name="short-movie-checkbox" className="checkbox__input"/>
        <span className="checkbox__switcher"/>
      </label>
      <p className="checkbox__title">{checkboxName}</p>
    </div>
  );
}

export default FilterCheckbox;
