import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

// //action types
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITING_MESSAGE = 'WRITING_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const USER_SET = 'USER_SET';

// //action creatore
const gotMessagesFromServer = messagesArr => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messagesArr,
  };
};

export const writingMessage = newMessageEntry => ({
  type: WRITING_MESSAGE,
  newMessageEntry,
});

const gotNewMessageFromServer = messageFrom => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  messageFrom,
});

export const userSet = newMessageEntry => ({
  type: USER_SET,
  newMessageEntry,
});

// //thunk action creators
export const fetchMessages = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/messages');
      const action = gotMessagesFromServer(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const postNewMessage = message => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/messages', message);
      const action = gotNewMessageFromServer(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
// // Reducer
const initialState = {
  messages: [],
  newMessageEntry: '',
  user: '',
  history: {
    '1': [],
    '2': [],
    '3': [],
    '4': [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER: {
      const newState = {
        ...state,
        messages: action.messagesArr,
      };
      return newState;
    }
    case WRITING_MESSAGE: {
      const newState = {
        ...state,
        newMessageEntry: action.newMessageEntry,
      };
      return newState;
    }
    case USER_SET: {
      const newState = {
        ...state,
        user: action.newMessageEntry,
      };
      return newState;
    }
    case GOT_NEW_MESSAGE_FROM_SERVER: {
      const historyId = `${action.messageFrom.channelId}`;
      const newState = {
        ...state,
        messages: [...state.messages, action.messageFrom],
        newMessageEntry: '',
        history: {
          ...state.history,
          [`${action.messageFrom.channelId}`]: [
            ...state.history[historyId],
            action.messageFrom,
          ],
        },
      };
      return newState;
    }

    default: {
      return state;
    }
  }
};

const store = createStore(
  reducer,
  applyMiddleware(loggingMiddleware, thunkMiddleware)
);
export default store;
