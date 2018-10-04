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
      gameId, id1, id2, user1, user2, currentPlayer,
    } = params;
    console.log(gameId);
    console.log(id1);
    console.log(id2);
    console.log(user1);
    console.log(user2);
    console.log(currentPlayer);
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
    Matches.upsert(
      { id: gameId },
      {
        status: 'on game',
        player1_id: id1,
        player1_user: user1,
        player2_id: id2,
        player2_user: user2,
        current_player: currentPlayer,
        linesX,
        linesY,
      },
    );

    const match = Matches.findOne({ gameId });
    return match;
  },
});
