import React from 'react';

import './NavTab.css';
import { Link } from 'react-scroll';

function NavTab() {
  return(
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__list-item">
          <Link to="about-project"
                className="nav-tab__link"
                spy={true}
                smooth={true}
          >О проекте
          </Link>
        </li>
        <li className="nav-tab__list-item">
          <Link to="techs"
                className="nav-tab__link"
                spy={true}
                smooth={true}
          >Технологии
          </Link>
        </li>
        <li className="nav-tab__list-item">
          <Link to="student"
                className="nav-tab__link"
                spy={true}
                smooth={true}
          >Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
