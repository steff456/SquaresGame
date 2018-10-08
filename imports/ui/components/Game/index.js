import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Container, Grid, Button } from "semantic-ui-react";
import { Meteor } from "meteor/meteor";

import { Games } from "../../../api/games.js";
import { Matches } from "../../../api/match.js";

import Square from "./square";
import LineVertical from "./line_vertical";
import LineHorizontal from "./line_horizontal";
import Space from "./space";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.leaveGame = this.leaveGame.bind(this);
    this.getCurrentGame = this.getCurrentGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.state = {
      turn: "",
      start: false,
      gameDoc: [],
      gameId: null
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
      const first = Math.random() > 0.5 ? "p1" : "p2";
      this.setState({ turn: first });
      const params = {
        gameId: id,
        id1: actg.player1_id,
        id2: actg.player2_id,
        user1: actg.player1_user,
        user2: actg.player2_user,
        currentPlayer: first
      };
      Meteor.call("matches.add", params, (err, match) => {
        if (err) {
          alert(err);
        }
        if (match) this.setState({ gameId: match._id });
        console.log("Match added!");
      });
    } else {
      // Start game
      const params = {
        gameId: id,
        id2: actg.player2_id,
        user2: actg.player2_user
      };
      Meteor.call("matches.join", params, (err, match) => {
        if (err) {
          alert(err);
        }
        console.log("Joined!");
        console.log(match);
        if (match) this.setState({ gameId: match._id });
        this.renderBoard();
      });
    }
  }

  leaveGame() {
    Meteor.call("games.remove", this.props.id);
    this.props.onGame(null);
  }

  renderBoard() {
    // console.log('render', this.props.match);

    return (
      <div>
        {" "}
        <div className="board">{this.renderSquareBoard()}</div>
      </div>
    );
  }

  renderSquareBoard() {
    const temp = Array.from({ length: 13 }, (v, i) => i);
    return temp.map((g, i) => (
      <div key={"line-" + i} className={this.renderSquareAux(i)}>
        {this.renderline(13, i)}
      </div>
    ));
  }

  renderSquareAux(i) {
    if (i % 2 == 0) {
      return "board-row-even";
    }
    return "board-row-odd";
  }

  renderline(size, j) {
    const temp = Array.from({ length: size }, (v, i) => i);

    return temp.map((g, i) => this.getDivType(j, i));
  }

  getDivType(i, j) {
    const id_board = `${i}-${j}`;
    let stateB = "NO";
    if (this.props.match[0]) {
      if (this.props.match[0].stateBoard) {
        if (this.props.match[0].stateBoard[id_board]) {
          stateB = this.props.match[0].stateBoard[id_board];
        }
      }
    }

    let stateBSq = "NO";
    if (this.props.match[0]) {
      if (this.props.match[0].squares) {
        if (this.props.match[0].squares[id_board]) {
          stateBSq = this.props.match[0].squares[id_board];
        }
      }
    }

    if (i % 2 === 0 && j % 2 === 0) {
      return <Space key={id_board} />;
    }
    if (i % 2 === 1 && j % 2 !== 0) {
      return <Square key={id_board} stateBoardSq={stateBSq} />;
    }
    if (i % 2 === 1 && j % 2 !== 1) {
      return (
        <LineVertical
          key={id_board}
          id={id_board}
          stateBoard={stateB}
          play={this.changeDocument.bind(this)}
        />
      );
    }
    return (
      <LineHorizontal
        key={id_board}
        id={id_board}
        stateBoard={stateB}
        play={this.changeDocument.bind(this)}
      />
    );
  }

  changeDocument(id) {
    const first = this.state.turn == "p2" ? "p1" : "p2";
    this.setState({ turn: first });

    Meteor.call("matches.update", this.state.gameId, id, first);
  }

  render() {
    const { start } = this.state;
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Container textAlign="center">
          <Grid centered>
            <Grid.Column>
              <Button onClick={this.leaveGame}>Leave the game</Button>
            </Grid.Column>
            <Grid.Column>{this.renderBoard()}</Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("matches");
  return {
    match: Matches.find({}).fetch()
  };
})(Game);
