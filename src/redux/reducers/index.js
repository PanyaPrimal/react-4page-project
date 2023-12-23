import { combineReducers } from 'redux';
import userReducer from './userReducer';
import messagesReducer from './messagesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,
});

export default rootReducer;