import React from 'react';
import { withRouter } from 'react-router-dom';
import {
 Navbar, Nav, NavItem, Image 
} from 'react-bootstrap';

import LoginButtons from '../../components/LoginButtons/index';

const MainNavBar = () => (
  <Navbar inverse collapseOnSelect className="my-header">
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/" className="header-text">
          {' '}
          Squares
        </a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem>
          <span className="glyphicon glyphicon-unchecked cube1" />
          <span className="glyphicon glyphicon-unchecked cube2" />
          <span className="glyphicon glyphicon-unchecked cube3" />
          <span className="glyphicon glyphicon-unchecked cube4" />
        </NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">
          <LoginButtons align="right" />
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default withRouter(MainNavBar);
