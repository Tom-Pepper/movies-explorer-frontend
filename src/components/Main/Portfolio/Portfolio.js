import React from 'react';

import './Portfolio.css';
import arrow from '../../../images/portfolio-arrow.svg';

function Portfolio() {
  return(
    <section className="portfolio about-project">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a href="https://tom-pepper.github.io/how-to-learn/index.html" className="portfolio__list-link"
             target="_blank" rel="noreferrer" >Статичный сайт</a>
          <img src={arrow} alt="Стрелка, указывающая в правый верхний угол" className="portfolio__list-link-image"/>
        </li>
        <li className="portfolio__list-item">
          <a href="https://tom-pepper.github.io/russian-travel/index.html" className="portfolio__list-link"
             target="_blank" rel="noreferrer" >Адаптивный сайт</a>
          <img src={arrow} alt="Стрелка, указывающая в правый верхний угол" className="portfolio__list-link-image"/>
        </li>
        <li className="portfolio__list-item">
          <a href="https://tom-pepper.github.io/mesto/index.html" className="portfolio__list-link"
             target="_blank" rel="noreferrer" >Одностраничное приложение</a>
          <img src={arrow} alt="Стрелка, указывающая в правый верхний угол" className="portfolio__list-link-image"/>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
