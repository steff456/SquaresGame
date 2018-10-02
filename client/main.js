import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { Games } from '../imports/api/games.js';

import App from '../imports/ui/App';
// import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});