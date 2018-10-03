import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

import LoginButtons from '../../components/LoginButtons/index';

const MainNavBar = () => (
  <header>
    <nav className="navbar main-nav no-margin">
      <Segment className="navbar-nav d-flex justify-content-end align-items-stretch">
        <Header as="h1" floated="right">
          Squares
        </Header>
        <div className="nav-item active">
          <LoginButtons align="right" />
        </div>
      </Segment>
    </nav>
  </header>
);

export default withRouter(MainNavBar);
