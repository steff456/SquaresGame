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
    this.changeDocument = this.changeDocument.bind(this);
    this.state = {
      turn: '',
      start: false,
      gameDoc: []
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
      this.setState({ turn: first });
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
        <div className="board">
          {this.renderSquareBoard()}
        </div>
      </div>
    );
  }

  renderSquareBoard() {
    let temp = Array.from({ length: 13 }, (v, i) => i);
    return temp.map((g, i) => (
      <div key={"line-" + i} className={this.renderSquareAux(i)}>
        {this.renderline(13, i)}
      </div>
    ));
  }

  renderSquareAux(i) {
    if (i % 2 == 0) {
      return "board-row-even"
    }
    else {
      return "board-row-odd"
    }
  }

  renderline(size, j) {
    let temp = Array.from({ length: size }, (v, i) => i);

    return temp.map((g, i) => (
      this.getDivType(j, i)
    ));
  }

  getDivType(i, j) {
    let id_board = i + "-" + j;
    let stateB = "NO"
    if (this.props.match[0]) {
      if (this.props.match[0].stateBoard)
        if (this.props.match[0].stateBoard[id_board])
          stateB = this.props.match[0].stateBoard[id_board];
    }
    if (i % 2 === 0 && j % 2 === 0) {
      return <Space key={id_board} />
    }
    else if (i % 2 === 1 && j % 2 !== 0) {

      return <Square key={id_board} />
    }
    else if (i % 2 === 1 && j % 2 !== 1) {
      return <LineVertical key={id_board} id={id_board} stateBoard={stateB} play={this.changeDocument} />
    }
    else {
      return <LineHorizontal key={id_board} id={id_board} stateBoard={stateB} />
    }
  }

  changeDocument(id) {
    console.log(id);
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
        {console.log(this.props.match[0], "==============================================")}
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
