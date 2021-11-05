import _ from "lodash";

/**
 * Precondition: payload.sender === null indicates message to be added
 * to existing conversation in store. else, new conversation must be made.
 * 
 * Called 1) when user posts message to existing conversation
 *        2) when user recieves message from existing conversation
 *        3) when user recieves message for new conversation.
 * 
 * @param {*} state 
 * @param {*} payload (containing message and sender field)
 * 
 * @returns clone state, with newly recieved/posted message added to 
 * an active conversation, or a brand new conversation with 
 * received first message add in messages array;
 */
 export const addMessageToStore = (state, payload) => {
  
  const { message, sender } = payload;
  let clone = _.cloneDeep(state); 

  if (sender === null) 
  {
    let convo = clone.find(element => element.id === message.conversationId)
    convo.latestMessageText = message.text;
    convo.messages.push(message);
    return clone;
  }
  // the action taken here is different from addNewConvoToStore, 
  // because no previous "empty" conversation between recipient and sender 
  // exists in recipient's store. Otherwise would refactor to make more dry
  const newConvo = {
    id: message.conversationId,
    otherUser: sender,
    messages: [message],
    latestMessageText : message.text
  };
  return [newConvo, ...clone];
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

/**
 * Precondition: the user has searched for another user. 
 * The searching user's store will contain an empty, "fake" conversation
 * with searched user's information (picture, name, etc)
 * stored in otherUser field.
 * 
 * This function is called after the user starts the conversation. 
 * The previously-empty conversation in store will 
 * now receive all conversation metadata. 
 * 
 * @param {*} state 
 * @param {*} recipientId 
 * @param {*} message 
 * 
 * @returns clone state, with previously empty 
 * conversation now including an id (from server), 
 * messages, and latest message.
 */
export const addNewConvoToStore = (state, recipientId, message) => {

  let clone = _.cloneDeep(state); // to ensure proper render, must be deep copy of nested state
  let convo = clone.find(element => element.otherUser.id === recipientId);
  convo.id = message.conversationId;
  convo.latestMessageText = message.text;
  convo.messages.push(message);
  return clone;

};


