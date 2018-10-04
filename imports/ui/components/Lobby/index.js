import React from 'react';
import { Games } from '../../../api/games.js';
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor'

class Lobby extends React.Component {

    constructor(props) {
        super(props);
        this.joinGame = this.joinGame.bind(this);
        this.changeGame = this.changeGame.bind(this);
    }

    renderActiveGames() {
        return this.props.games.map((g, i) => {
            return (<li key={i}>
                {g.id} - {g.status}
                <Button key={g.id} onClick={() => this.joinGame(g.id)}> Join </Button>
            </li>);
        });
    }

    joinGame(id) {
        Meteor.call("games.update", id, (err, game) => {
            if (err) { alert(err); return; }
            this.changeGame(game);
        });
    }

    changeGame(id) {
        this.props.onGame(id);
    }

    createNewGame(evt) {
        evt.preventDefault();

        alert("new game created");

        Meteor.call("games.add", (err, game) => {
            if (err) { alert(err); return; }
            this.changeGame(game);
        });
    }


    render() {
        return <div>
            <Button onClick={this.createNewGame.bind(this)}>Create new Game</Button>
            <ul>
                {this.renderActiveGames()}
            </ul>
        </div>
    }
}

Lobby.propTypes = {
    games: PropTypes.array.isRequired,
    onGame: PropTypes.func
}

export default withTracker(() => {
    Meteor.subscribe("games");
    return {
        games: Games.find({ status: "waiting", id: { $ne: Meteor.userId() } }).fetch()
    };
})(Lobby);