//usar strict en los archivos js
//agregar comentarios

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './containers/Header/index';
import HomePage from './containers/HomePage/index';
import NotFound from './containers/NotFoundPage/index';

export default class MainLayout extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
      //considero que es mas limpio agregar un route en un archivo separado, el cual reemplaza el js. donde se monta el APP.js en el html
            <Route exact path="/" component={HomePage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
