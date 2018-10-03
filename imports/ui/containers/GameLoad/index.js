import React from 'react';
import Lobby from '../../components/Lobby/index';
import Game from '../../components/Game/index';

export default class GameLoad extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game: null
        }
        this.changeGame = this.changeGame.bind(this);
    }

    Load(props){ 
        const id = props.game 
        const game = props.onGame      
        if(id ==null){
            return <Lobby onGame={game}/>
        }
        else{
            return <Game onGame={game} id={id}/>
        }
    }

    changeGame(change){
        this.setState({
            game:change
        });
    }

    render() {
        return <div>
            <this.Load game={this.state.game} onGame={this.changeGame}/>
        </div>
    }
}