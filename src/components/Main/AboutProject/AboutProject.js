import React from 'react';

import './AboutProject.css';
import PortfolioTitle from "../../PortfolioTitle/PortfolioTitle";

function AboutProject() {
  return(
    <section className="about-project" id="about-project">
      <PortfolioTitle title="О проекте" />
      <ul className="about-project__content">
        <li className="about-project__content-item">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__item-text">Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__content-item">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__item-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
            было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;
