export const addContact = (contact) => ({
  type: 'ADD_CONTACT',
  payload: contact,
});

export const deleteContact = (contactId) => ({
  type: 'DELETE_CONTACT',
  payload: contactId,
});

export const saveContact = (updatedContact) => ({
  type: 'SAVE_EDITED_CONTACT',
  payload: updatedContact,
})

export const deleteAllContacts  = (contactId) => ({
  type: 'DELETE_ALL_CONTACTS',
});