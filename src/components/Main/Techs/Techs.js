import React from 'react';

import './Techs.css';
import PortfolioTitle from "../../PortfolioTitle/PortfolioTitle";

function Techs() {
  return(
    <section className="techs about-project" id="techs">
      <PortfolioTitle title="Технологии" />
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__description about-project__item-text">На курсе веб-разработки мы освоили технологии,
        которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__list-tech">HTML</li>
        <li className="techs__list-tech">CSS</li>
        <li className="techs__list-tech">JS</li>
        <li className="techs__list-tech">React</li>
        <li className="techs__list-tech">Git</li>
        <li className="techs__list-tech">Express.js</li>
        <li className="techs__list-tech">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
