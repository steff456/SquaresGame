import React from 'react';
import { NavLink } from 'react-router-dom';

import { Image, Container } from 'semantic-ui-react';

import MainNavBar from './MainNavBar';
export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Container className="header-container d-flex justify-content-between align-items-stretch">
          <MainNavBar />
        </Container>
      </header>
    );
  }
}
