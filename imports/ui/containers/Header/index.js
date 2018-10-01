import React from 'react';
import { NavLink } from 'react-router-dom';

import LoginButtons from '../../components/LoginButtons/index';

export default class Header extends React.Component {
  render() {
    return (
      <header className='Header'>
        <b>Header</b> &nbsp;
        <NavLink activeClassName="active" exact to="/">Home</NavLink>
        <NavLink to="/bad-url">Not Found Page</NavLink>
        <LoginButtons align='left' />
      </header>
    );
  }
}
