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
    console.log('gameId', gameId);
    console.log('params', params);
    if (!gameId) {
      throw new Meteor.Error('Not authorized');
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
    });
    console.log(gameId);
    const match = Matches.findOne(gameId);
    console.log('created match', match);
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
});
