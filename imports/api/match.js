//agregar comentarios al archivo y a los metodos
//usar strict en los archivos js.

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Matches = new Mongo.Collection('matches');

const sizeBoard = 6;

if (Meteor.isServer) {
    Meteor.publish('matches', () => Matches.find({}));
}

Meteor.methods({
    'matches.add': (params) => {
        const {
            gameId: game, id1, id2, user1, user2, currentPlayer
        } = params;
        const { _id: gameId } = game;

        if (!gameId) {
            throw new Meteor.Error('Not authorized');
        }

        const stateBoard = {};

        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 13; j++) {
                if (i % 2 + j % 2 == 1) {
                    let toAdd = i + "-" + j;
                    stateBoard[toAdd] = "NO"
                }
            }
        }

        const squares = {}
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 13; j++) {
                if (i % 2 + j % 2 == 2) {
                    let toAdd = i + "-" + j;
                    squares[toAdd] = "NO"
                }
            }
        }

        const linesX = [];
        const linesY = [];
        for (let i = 0; i < sizeBoard; i += 1) {
            for (let j = 0; j < sizeBoard; j += 1) {
                const ob = {
                    takenBy: '',
                    marked: false,
                };
                linesX.push(ob);
                linesY.push(ob);
            }
        }

        try {
            Matches.insert({
                _id: gameId,
                status: 'waiting',
                player1_id: id1,
                player1_user: user1,
                player2_id: id2,
                player2_user: user2,
                current_player: currentPlayer,
                linesX,
                linesY,
                stateBoard,
                squares
            });
        }
        catch (err) { }
        const match = Matches.findOne(gameId);
        return match;
    },
    'matches.join': (params) => {
        console.log('*********');
        const { gameId, id2, user2 } = params;
        console.log('params', params);
        actg = Matches.findOne(gameId);
        console.log('matches found', actg);
        Matches.update(gameId, {
            $set: {
                player2_id: id2,
                player2_user: user2,
                status: 'onGame',
            },
        });
        const match = Matches.findOne(gameId);
        console.log('updated match', match);
        return match;
    },
    'matches.update': (id, idBoard, player) => {

        const match = Matches.findOne(id);
        let map = match.stateBoard;
        map[idBoard] = player == "p1" ? "p2" : "p1";
        Matches.update(id, {
            $set: {
                stateBoard: map,
                current_player: player
            },
        });

        let sq = match.squares;
        for (let key in sq) {
            let arr = key.split("-");
            let i = Number(arr[0]);
            let j = Number(arr[1]);

            let nexti = i + 1;
            let nextj = j + 1;
            let bfi = i - 1;
            let bfj = j - 1;

            let l1 = map[bfi + "-" + j];
            let l2 = map[i + "-" + nextj];
            let l3 = map[nexti + "-" + j];
            let l4 = map[i + "-" + bfj];

            if (l1 !== "NO" && l2 !== "NO" && l3 !== "NO" && l4 !== "NO" && sq[key] === "NO") {
                sq[key] = player
            }
        }

        Matches.update(id, {
            $set: {
                squares: sq
            },
        });
    }
});
