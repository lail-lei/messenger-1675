
const addMessagetoConversation = (state, index, message) => {
  const clone = [...state];
  const clonedConvo = {...clone[index]};
  clonedConvo.messages = [...clone[index].messages, message];
  clonedConvo.latestMessageText = message.text;
  clone[index] = clonedConvo;
  return clone;
} 

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  
  if (sender === null) 
  {
    let index = state.findIndex(element => element.id === message.conversationId);
    return addMessagetoConversation(state, index, message);
  }

  const newConvo = {
    id: message.conversationId,
    otherUser: sender,
    messages: [message],
    latestMessageText : message.text
  };
  return [newConvo, ...state];
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


export const addNewConvoToStore = (state, recipientId, message) => {
  const index = state.findIndex(element => element.otherUser.id === recipientId);
  return addMessagetoConversation(state, index, message);
};


