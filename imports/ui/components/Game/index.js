import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

import { Games } from '../../../api/games.js';
import { Matches } from '../../../api/match.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.leaveGame = this.leaveGame.bind(this);
    this.getCurrentGame = this.getCurrentGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.state = {
      turn: '',
      start: false,
    };
  }

  componentDidMount() {
    // console.log(this.props);
    this.getCurrentGame();
  }

  componentDidUpdate() {
    // console.log('******');
    // console.log(this.state);
  }

  getCurrentGame() {
    const { id } = this.props;
    const g = Games.find({ id: { $ne: id } }).fetch();
    const actg = g[g.length - 1];
    if (actg.player2_id === null) {
      const first = Math.random() > 0.5 ? 'p1' : 'p2';
      const params = {
        gameId: id,
        id1: actg.player1_id,
        id2: actg.player2_id,
        user1: actg.player1_user,
        user2: actg.player2_user,
        currentPlayer: first,
      };
      Meteor.call('matches.add', params, (err, match) => {
        if (err) {
          alert(err);
        }
        console.log('Match added!');
      });
    } else {
      // Start game
      const params = {
        gameId: id,
        id2: actg.player2_id,
        user2: actg.player2_user,
      };
      Meteor.call('matches.join', params, (err, match) => {
        if (err) {
          alert(err);
        }
        console.log('Joined!');
        console.log(match);
        this.renderBoard();
      });
    }
  }

  leaveGame() {
    Meteor.call('games.remove', this.props.id);
    this.props.onGame(null);
  }

  renderBoard() {
    // console.log('render', this.props.match);
    return (
      <div>
        {' '}
        <h1> Lo logramos!!</h1>
      </div>
    );
  }

  render() {
    const { start } = this.state;
    return (
      <div>
        <Button onClick={this.leaveGame}>Leave the game</Button>
        {start && (
          <div>
            <h1>Start game</h1>
          </div>
        )}
        <div>{this.renderBoard()}</div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('matches');
  return {
    match: Matches.find({}).fetch(),
  };
})(Game);
