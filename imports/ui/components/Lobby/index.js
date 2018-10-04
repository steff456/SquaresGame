import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Games } from '../../../api/games.js';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.joinGame = this.joinGame.bind(this);
    this.changeGame = this.changeGame.bind(this);
  }

  renderActiveGames() {
    return this.props.games.map((g, i) => (
      <li key={i}>
        {g.id}
{' '}
-
{' '}
{g.status}
        <Button key={g.id} onClick={() => this.joinGame(g.id)}>
          {' '}
          Join
{" "}
        </Button>
      </li>
    ));
  }

  joinGame(id) {
    const game = Games.find({ id }).fetch();
    Games.update(game[0]._id, {
      status: 'playing',
      player2_id: Meteor.userId(),
      player2_user: Meteor.user().username,
    });
    this.changeGame(game[0]._id);
  }

  changeGame(id) {
    this.props.onGame(id);
  }

  createNewGame(evt) {
    evt.preventDefault();

    const exist = Games.find({ id: Meteor.userId() }).fetch();

    if (exist.length != 0) {
      alert('You have already a game');
      this.changeGame(exist[0]._id);
    } else {
      alert('new game created');
      const newGame = Games.insert({
        id: Meteor.userId(),
        status: 'waiting',
        player1_id: Meteor.userId(),
        player1_user: Meteor.user().username,
        player2_id: null,
        player2_user: null,
        date: new Date(),
      });
      this.changeGame(newGame);
    }
  }

  render() {
    return (
      <div>
        <Button onClick={this.createNewGame.bind(this)}>Create new Game</Button>
        <ul>{this.renderActiveGames()}</ul>
      </div>
    );
  }
}

Lobby.propTypes = {
  games: PropTypes.array.isRequired,
  onGame: PropTypes.func,
};

export default withTracker(() => ({
  games: Games.find({
    status: 'waiting',
    id: { $ne: Meteor.userId() },
  }).fetch(),
}))(Lobby);
