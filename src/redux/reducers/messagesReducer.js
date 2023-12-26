const initialState = {
  messages: [],
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

      case 'EDIT_MESSAGE':
        const { id, updatedMessage } = action.payload;
        const updatedMessages = state.messages.map((message) =>
          message.id === id ? { ...message, ...updatedMessage } : message
        );
      
        return {
          ...state,
          messages: updatedMessages,
      };

    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter((message) => message.id !== action.payload),
      };

    case 'CLEAR_ALL_MESSAGES':
      return {
        ...state,
        messages: [],
      };

    default:
      return state;
  }
};

export default messagesReducer;