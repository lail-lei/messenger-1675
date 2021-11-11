const db = require("../db");
const Sequelize = require("sequelize");

const Conversation = db.define("conversation", {
    chatName: {
                type: Sequelize.STRING,
                allowNull: false,
              },
    photoUrl: {
                type: Sequelize.STRING
              },
});

module.exports = Conversation;
