import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteAllContacts,
  deleteContact,
  saveContact,
} from '../../../redux/actions/contactsActions';
import styles from './contacts.css';

const ContactsPage = () => {
  const [newContact, setNewContact] = useState({ fullName: '', phoneNumber: '' });
  const [editedContact, setEditedContact] = useState({ fullName: '', phoneNumber: '' });
  const [editingContactId, setEditingContactId] = useState(null);
  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const [hoveredContactId, setHoveredContactId] = useState(null);
  const [showDeleteAllConfirmation, setShowDeleteAllConfirmation] = useState(false);

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts) || [];

  const handleMouseEnter = (contactId) => {
    setHoveredContactId(contactId);
  };

  const handleMouseLeave = () => {
    setHoveredContactId(null);
  };

  const handleAddContact = () => {
    setShowAddContactForm(true);
  };

  const handleSaveNewContact = () => {
    if (newContact.fullName && newContact.phoneNumber) {
      dispatch(addContact({ id: Date.now(), ...newContact }));
      setNewContact({ fullName: '', phoneNumber: '' });
      setShowAddContactForm(false);
    } else {
      alert('Please enter name and phone.');
    }
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleEditContact = (contactId) => {
    const contactToEdit = contacts.find((contact) => contact.id === contactId);
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
    setShowDeleteAllConfirmation(true);
  };

  const handleClearAllContacts = () => {
    dispatch(deleteAllContacts());
    setShowDeleteAllConfirmation(false);
  };

  const handleCancelDeleteAllContacts = () => {
    setShowDeleteAllConfirmation(false);
  };

  return (
    <div className='contacts-page'>
      {showDeleteAllConfirmation && (
        <div className='modal-overlay'></div>
      )}

      <h1 className='fs-2 m-4'>Contacts Page</h1>
      {showAddContactForm ? (
        <div>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              value={newContact.fullName}
              onChange={(e) => setNewContact({ ...newContact, fullName: e.target.value })}
            />
          </div>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Phone Number'
              value={newContact.phoneNumber}
              onChange={(e) => setNewContact({ ...newContact, phoneNumber: e.target.value })}
            />
          </div>
          <div className='mb-5 d-flex gap-2'>
            <button className='button' onClick={handleSaveNewContact}>
              Save Contact
            </button>
            <button className='button' onClick={() => setShowAddContactForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className='mb-3 d-flex gap-2'>
          <button className='button' onClick={handleAddContact}>
            Add Contact
          </button>
          <button className='button button-danger' onClick={handleDeleteAllContacts}>
            Delete All Contacts
          </button>
        </div>
      )}

      <ul className='list-group flex-column gap-3'>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className='list-group-item'
            onMouseEnter={() => handleMouseEnter(contact.id)}
            onMouseLeave={handleMouseLeave}
          >
            {editingContactId === contact.id ? (
              <div className='d-flex justify-content-between'>
                <div className='d-flex gap-2'>
                  <input
                    type='text'
                    className='form-control'
                    value={editedContact.fullName}
                    onChange={(e) => setEditedContact({ ...editedContact, fullName: e.target.value })}
                  />
                  <input
                    type='text'
                    className='form-control'
                    value={editedContact.phoneNumber}
                    onChange={(e) => setEditedContact({ ...editedContact, phoneNumber: e.target.value })}
                  />
                </div>
                <div className='d-flex gap-2'>
                  <button className='button button-modal' onClick={() => handleSaveContact(contact.id)}>
                    Save
                  </button>
                  <button className='button button-modal' onClick={() => handleCancelEdit()}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className='d-flex justify-content-between'>
                <div className="contact-details">
                  <span className="contact-name">{contact.fullName}:</span>
                  <span className="contact-number"> {contact.phoneNumber}</span>
                </div>
                {hoveredContactId === contact.id && (
                  <div className='d-flex gap-2'>
                    <button className='button button-modal' onClick={() => handleEditContact(contact.id)}>
                      Edit
                    </button>
                    <button className='button button-modal button-danger' onClick={() => handleDeleteContact(contact.id)}>
                      X
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      
      {showDeleteAllConfirmation && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-body fw-bold fs-2'>
                <p>Are you sure you want to delete all contacts?</p>
              </div>
              <div className='modal-footer'>
                <button type='button' className='button button-modal btn-secondary' onClick={handleCancelDeleteAllContacts}>
                  Cancel
                </button>
                <button type='button' className='button button-modal btn-danger' onClick={handleClearAllContacts}>
                  Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;