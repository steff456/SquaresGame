import React from 'react';
import { Games } from '../../../api/games.js';
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor'

class Lobby extends React.Component {

    constructor(props) {
        super(props);
    }

    renderActiveGames(){
        return this.props.games.map((g,i) =>{
            return (<li key={i}>
                {g.id} - {g.status}
                <Button key={g.id} onClick={()=> this.joinGame(g.id).bind(this)}> Join </Button>
            </li>);   
        });
    }

    joinGame(id){
        alert("Join to game", id);
     /*   Games.update({
            id: Meteor.userId()},{                
            status: "playing",
            player2_id: Meteor.userId(),
        });*/
    }


    createNewGame(evt){
        evt.preventDefault();

        let exist = Games.find({id:Meteor.userId()}).fetch()

        if(exist.length != 0){
            alert("You have already a game")
            //TODO : GO TO GAME
        }
        else{
            alert("new game created");
            Games.insert({
                id: Meteor.userId(),                
                status: "waiting",
                player2_id: null,
                date: new Date()            
            });
            //TODO : GO TO WAITING SOMEONE TO JOIN TO GAME
        }        
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
    games: PropTypes.array.isRequired
}

export default withTracker(() => {
    return {
        games: Games.find({status:"waiting", id: {$ne: Meteor.userId()}}).fetch()
    };
})(Lobby);