import React from 'react';

import './AboutMe.css';
import photo from '../../../images/artem.jpg';
import PortfolioTitle from "../../PortfolioTitle/PortfolioTitle";

function AboutMe() {
  return(
    <section className="about-me about-project" id="student">
      <PortfolioTitle title="Студент" />
      <div className="about-me__wrapper">
        <img src={photo} alt="Фотография меня (Артёма)" className="about-me__photo"/>
        <div className="about-me__bio-wrapper">
          <div className="about-me__bio-wrapper-info">
            <h3 className="about-me__name techs__title">Артем</h3>
            <h4 className="about-me__subtitle">Фронтенд-разработчик</h4>
            <p className="about-me__bio about-project__item-text">Привет! Я из Москвы, карьеру начинал в IT, потом
              работал в продажах, и даже руководил собственным интернет-
              магазином. Увлекаюсь бегом, настольными играми и путешествиями. А еще у меня есть замечательная жена и ...
              небольшая пасека в Подмосковье.<br/>
              С ноября 2019 вернулся в IT — тестировщиком. Во время обучения в Яндексе стал
              фронтенд- разработчиком в своей компании. Страстно полюбил фронтенд и красивый код.</p>
          </div>
          <ul className="about-me__contacts">
            <li className="about-me__contacts-link">
              <a href="https://www.linkedin.com/in/artem88/" className="about-me__contacts-link" target="_blank">LinkedIn</a>
            </li>
            <li className="about-me__contacts-link">
              <a href="https://github.com/Tom-Pepper" className="about-me__contacts-link" target="_blank">GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
