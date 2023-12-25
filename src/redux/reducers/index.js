import { combineReducers } from 'redux';
import messagesReducer from './messagesReducer';
import contactsReducer from './contactsReducer';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  messages: messagesReducer,
});

export default rootReducer;