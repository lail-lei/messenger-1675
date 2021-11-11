const Sequelize = require("sequelize");
const db = require("../db");

const ReadMessage = db.define("read_message", {
    read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = ReadMessage;