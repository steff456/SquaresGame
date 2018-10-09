//intentar usar strict en los archivos javascript, a pesar de que sean creados por meteor

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';
import { Games } from '../imports/api/games.js';

import App from '../imports/ui/App';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
