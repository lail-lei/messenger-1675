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


const addMessagetoConversation = (state, index, message) => {
  let clone = [...state];
  let clonedConvo = {...clone[index]};
  clonedConvo.messages = [...clone[index].messages, message];
  clonedConvo.latestMessageText = message.text;
  clone.splice(index, 1);
  return [clonedConvo, ...clone];
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
    latestMessageText : message.text,
    unread: 1
  };
  return [newConvo, ...state];
};

export const addNewConvoToStore = (state, recipientId, message) => {
  let index = state.findIndex(element => element.otherUser.id === recipientId);
  return addMessagetoConversation(state, index, message);
};

const updateReads = (state, conversationId, incrementing) => {
  let clone = [...state];
  let index = clone.findIndex(element => element.id === conversationId);
  let clonedConvo = {...clone[index]};
  if (incrementing) clonedConvo.unread++;
  else clonedConvo.unread = 0;
  clone[index] = clonedConvo;
  return clone;
}

export const readMessagesInStore = (state, conversationId) => {
  return updateReads(state, conversationId);
}

export const incrementUnreadInStore = (state, conversationId) => {
  return updateReads(state, conversationId, true);
}

 