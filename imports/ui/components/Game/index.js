import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

import { Games } from '../../../api/games.js';
import { Matches } from '../../../api/match.js';

import Square from './square';
import LineVertical from './line_vertical';
import LineHorizontal from './line_horizontal'
import Space from './space'

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
        <div class="board">
          <div className="board-row">
            {this.renderline(6, 0)}
          </div>
          <div className="board-row">
            {this.renderline(6, 1)}
          </div>
          <div className="board-row">
            {this.renderline(6, 2)}
          </div>
          <div className="board-row">
            {this.renderline(6, 3)}
          </div>
        </div>
      </div>
    );
  }

  renderline(size, j) {
    let temp = Array.from({ length: size }, (v, i) => i);
    console.log(temp, "===ARRAY")
    return temp.map((g, i) => (
      this.getDivType(j, i)
    ));
  }

  getDivType(i, j) {
    if (i % 2 === 0 && j % 2 === 0) {
      console.log(i, j, "=====================SPACE");
      return <Space key={i * j + j} />
    }
    else if (i % 2 === 0 && j % 2 !== 1) {
      console.log(i, j, "=====================HOR");
      return <LineHorizontal key={i * j + j} />
    }
    else if (i % 2 === 1 && j % 2 !== 0) {
      console.log(i, j, "=====================VER");
      return <Square key={i * j + j} />
    }
    else if (i % 2 === 1 && j % 2 !== 1) {
      console.log(i, j, "=====================SQ");
      return <LineVertical key={i * j + j} />
    }
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
