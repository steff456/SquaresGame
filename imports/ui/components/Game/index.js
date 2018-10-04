import React from 'react';
import { Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor'

import { Games } from '../../../api/games.js';
import { Match } from '../../../api/match.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.leaveGame = this.leaveGame.bind(this);
    this.getCurrentGame = this.getCurrentGame.bind(this);
  }

  state = {
    turn: 'p1',
    start: False,
  };

  componentDidMount() {
    console.log(this.props);
    this.getCurrentGame();
  }
    leaveGame() {
        Meteor.call("games.remove", this.props.id);
        this.props.onGame(null);
    }

  componentDidUpdate() {
    console.log('******');
    this.getPlayers();
  }

  getCurrentGame() {
    const { id } = this.props;
    const g = Games.find({ id: { $ne: id } }).fetch();
    console.log(g[g.length - 1]);
    if (g.player2_id !== null) {
      // Start game
    }
  }

  leaveGame() {
    const { id } = this.props;
    Games.remove(id);
    this.props.onGame(null);
  }

  render() {
    return (
      <div>
        <Button onClick={this.leaveGame}>Leave the game</Button>
      </div>
    );
  }
}
