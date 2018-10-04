import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
    Meteor.publish("games", () => {
        return Games.find({});
    });
}

Meteor.methods(
    {
        "games.add": function () {
            const id = Meteor.userId();
            if (!id) {
                throw new Meteor.Error("Not authorized");
            }

            Games.upsert(
                { id: Meteor.userId() },
                {
                    id: id,
                    status: "waiting",
                    player1_id: Meteor.userId(),
                    player1_user: Meteor.user().username,
                    player2_id: null,
                    player2_user: null,
                    date: new Date()
                }
            );

            const game = Games.findOne({ id });
            return game;
        },
        "games.update": function (id) {
            let game = Games.find({ id: id }).fetch();
            Games.update(game[0]._id,
                {
                    status: "playing",
                    player2_id: Meteor.userId(),
                    player2_user: Meteor.user().username
                });
            return game[0]._id;
        },
        "games.findById": function (id) {
            let exist = Games.find({ id: Meteor.userId() }).fetch();
            return exist;
        },
        "games.remove": function (id) {
            Games.remove(id);
        },
        "games.find": function () {
            let game = Games.find({ $or: [{ player1_id: Meteor.userId() }, { player2_id: Meteor.userId() }] }).fetch();
            return game;
        }
    }
);