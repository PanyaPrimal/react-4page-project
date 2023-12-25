import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteAllContacts, deleteContact, editContact, saveContact } from '../../../redux/actions/contactsActions';

const ContactsPage = () => {
  const [newContact, setNewContact] = useState({ fullName: '', phoneNumber: '' });
  const [editedContact, setEditedContact] = useState({ fullName: '', phoneNumber: '' });
  const [editingContactId, setEditingContactId] = useState(null);

  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.contacts) || [];

  const handleAddContact = () => {
    if (newContact.fullName && newContact.phoneNumber) {
      dispatch(addContact({ id: Date.now(), ...newContact }));
      setNewContact({ fullName: '', phoneNumber: '' });
    } else {
      alert('Please enter name and phone.');
    }
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleEditContact = (contactId) => {
    const contactToEdit = contacts.find(contact => contact.id === contactId);
    setEditingContactId(contactId);
    setEditedContact({ ...contactToEdit });
  };

  const handleSaveContact = (contactId) => {
    dispatch(saveContact({ id: contactId, ...editedContact }));
    setEditingContactId(null);
    setEditedContact({ fullName: '', phoneNumber: '' });
  };

  const handleCancelEdit = () => {
    setEditingContactId(null);
    setEditedContact({ fullName: '', phoneNumber: '' });
  };

  const handleDeleteAllContacts = () => {
    if (contacts.length > 0) {
      const isConfirmed = window.confirm('Are you sure you want to delete all contacts?');
  
      if (isConfirmed) {
        dispatch(deleteAllContacts());
      }
    } else {
      alert('No contacts to delete.');
    }
  };

  return (
    <div>
      <h1 className='fs-2 m-4'>Contacts Page</h1>
      <div>
        <input 
          type="text" 
          placeholder="Name" 
          value={newContact.fullName} 
          onChange={(e) => setNewContact({ ...newContact, fullName: e.target.value })} 
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newContact.phoneNumber}
          onChange={(e) => setNewContact({ ...newContact, phoneNumber: e.target.value })}
        />
        <button onClick={handleAddContact}>Add Contact</button>
        <button onClick={handleDeleteAllContacts}>Delete All Contacts</button>
      </div>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {editingContactId === contact.id ? (
              <>
                <input
                  type="text"
                  value={editedContact.fullName}
                  onChange={(e) => setEditedContact({ ...editedContact, fullName: e.target.value })}
                />
                <input
                  type="text"
                  value={editedContact.phoneNumber}
                  onChange={(e) => setEditedContact({ ...editedContact, phoneNumber: e.target.value })}
                />
                <button onClick={() => handleSaveContact(contact.id)}>Save</button>
                <button onClick={() => handleCancelEdit()}>Cancel</button>
              </>
            ) : (
              <>
                {contact.fullName} - {contact.phoneNumber}
                <button onClick={() => handleEditContact(contact.id)}>Edit</button>
                <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsPage;