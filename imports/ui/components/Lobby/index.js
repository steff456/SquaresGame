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

        this.state = {
            won: '50%',
            looses: '50%'
        }
    }

    renderActiveGames() {
        return this.props.games.map((g, i) => {
            return (<li key={i}>
                <Button key={g.id} onClick={() => this.joinGame(g.id)}>{g.player1_user}</Button>
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

    componentDidMount() {
        const chart = document.querySelector('.chart');
        const totalBars = document.querySelectorAll('.bar').length;
        const percentDivs = document.querySelectorAll('.bar-percent');

        //Automatically adjust bar's height based on its percentage with 'grid-row-start' property
        percentDivs.forEach(percentDiv => {
            const barPercent = Math.floor(percentDiv.textContent.replace('%', ''));

            percentDiv.parentNode.style.setProperty('grid-row-start', 100 - `${barPercent}`);
        });

        //Automatically set 'grid-template-columns' value depending on no. of bars
        chart.style.setProperty('grid-template-columns', `repeat(${totalBars}, 1fr)`);
    }

    render() {
        return <div className="game">
            <div className="container1">
                <Button className="newGame-btt" onClick={this.createNewGame.bind(this)}>Create new Game</Button>
                <div className="join">
                    <legend><h5>Or you can play with:</h5></legend>
                    <div className="legend1">
                        <ul>
                            {this.renderActiveGames()}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container2">
                <h2>Stats</h2>
                <div className="chart">
                    <div className="bar">
                        <div className="bar-percent">{this.state.won}</div>
                        <div className="bar-name">Won</div>
                    </div>
                    <div className="bar">
                        <div className="bar-percent">{this.state.looses}</div>
                        <div className="bar-name">Looses</div>
                    </div>
                </div>
            </div>
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