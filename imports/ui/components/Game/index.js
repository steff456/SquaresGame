import React from 'react';
import { Button } from 'semantic-ui-react';
import { Games } from '../../../api/games.js';


export default class Game extends React.Component {

    constructor(props) {
        super(props)
        this.leaveGame = this.leaveGame.bind(this);
    }

    leaveGame(){   
        Games.remove(this.props.id);
        this.props.onGame(null);
    }

    render() {
        return <div>
            <Button onClick={this.leaveGame}>Leave the game</Button>
        </div>
    }
}