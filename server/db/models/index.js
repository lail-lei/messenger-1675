const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const ReadMessage = require("./readMessages");

// associations
Conversation.belongsToMany(User, {through: "conversation_participants" });
Message.belongsTo(Conversation);
Message.belongsTo(User, {as : 'sender'})
Message.belongsToMany(User, {through: ReadMessage});


module.exports = {
  User,
  Conversation,
  Message
};
