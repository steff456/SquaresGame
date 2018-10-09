//comentarios y use strict

import React from 'react';
import Lobby from '../../components/Lobby/index';
import Game from '../../components/Game/index';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'

class GameLoad extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game: null,
        }
        this.changeGame = this.changeGame.bind(this);
    }

    Load(props) {
        const id = props.game
        const game = props.onGame

        if (id == null) {
            return <Lobby onGame={game} />
        }
        else {
            return <Game onGame={game} id={id} />
        }
    }

    changeGame(change) {
        this.setState({
            game: change
        });
    }

    letters(text) {
        let array = (text).split("");
        return array.map((g, i) => {
            let classes = "letters-div letter" + (i + 1) % 4
            return (
                <div key={i} className={classes}>
                    {g}
                </div>
            );
        });
    }

    render() {
        return <div>
            {this.props.currentUser ?
                <this.Load game={this.state.game} onGame={this.changeGame} />
                :
                <div className="letters-content">
                    <div className="word">
                        <img src="https://raw.githubusercontent.com/steff456/SquaresGame/master/public/images/squares.gif" />
                    </div>
                    <div className="word">
                        {this.letters("SQUARES")}
                    </div>
                    <div className="word">
                        {this.letters("HAVE")}
                    </div>
                    <div className="word">
                        {this.letters("FUN")}
                    </div>
                </div>
            }
        </div>
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(GameLoad)
