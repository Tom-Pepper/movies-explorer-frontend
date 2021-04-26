import React from 'react';

import './AboutMe.css';
import photo from '../../../images/artem.jpg';
import PortfolioTitle from "../../PortfolioTitle/PortfolioTitle";

function AboutMe() {
  // Функция динамического расчета возраста
  function age(birtDate) {
    const years = ((new Date().getTime() - new Date(birtDate)) / (24 * 3600 * 365.25 * 1000)) | 0;
    const secondDigit = +String(years).charAt(1);

    if (secondDigit === 1) {
      return years + ' год';
    } else if (secondDigit === 2 || secondDigit === 3 || secondDigit === 4) {
      return years + ' года';
    } else {
      return years + ' лет';
    }
  }

  return(
    <section className="about-me about-project" id="student">
      <PortfolioTitle title="Студент" />
      <div className="about-me__wrapper">
        <img src={photo} alt="Фотография меня (Артёма)" className="about-me__photo"/>
        <div className="about-me__bio-wrapper">
          <div className="about-me__bio-wrapper-info">
            <h3 className="about-me__name techs__title">Артем</h3>
            <h4 className="about-me__subtitle">
              Фронтенд-разработчик, {age('1988-06-04')}
            </h4>
            <p className="about-me__bio about-project__item-text">Привет! Я из Москвы, карьеру начинал в IT, потом
              работал в продажах, и даже руководил собственным интернет-
              магазином. Увлекаюсь бегом, настольными играми и путешествиями. А еще у меня есть замечательная жена и ...
              небольшая пасека в Подмосковье.<br/>
              С ноября 2019 вернулся в IT — тестировщиком. Во время обучения в Яндексе стал
              фронтенд- разработчиком в своей компании. Страстно полюбил фронтенд и красивый код.</p>
          </div>
          <ul className="about-me__contacts">
            <li className="about-me__contacts-link">
              <a href="https://www.linkedin.com/in/artem88/" className="about-me__contacts-link"
                 target="_blank" rel="noreferrer" >LinkedIn</a>
            </li>
            <li className="about-me__contacts-link">
              <a href="https://github.com/Tom-Pepper" className="about-me__contacts-link"
                 target="_blank" rel="noreferrer" >GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
