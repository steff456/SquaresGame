import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import LoginButtons from '../../components/LoginButtons/index';

const MainNavBar = () => (
  <nav className="navbar main-nav no-margin">
    <ul className="navbar-nav d-flex justify-content-end align-items-stretch">
      <li className="nav-item">
        <LoginButtons align="left" />
      </li>
    </ul>
  </nav>
);

export default withRouter(MainNavBar);
