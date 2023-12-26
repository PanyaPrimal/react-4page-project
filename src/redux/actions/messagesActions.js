export const addMessage = (message) => ({
  type: 'ADD_MESSAGE',
  payload: message,
});

export const deleteMessage = (id) => ({
  type: 'DELETE_MESSAGE',
  payload: id,
});

export const editMessage = (id, updatedMessage) => ({
  type: 'EDIT_MESSAGE',
  payload: { id, updatedMessage },
});

export const clearAllMessages = () => ({
  type: 'CLEAR_ALL_MESSAGES',
});
