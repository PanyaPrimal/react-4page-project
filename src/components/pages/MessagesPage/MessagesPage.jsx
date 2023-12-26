import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../../redux/actions/contactsActions';
import { addMessage, deleteMessage, editMessage, clearAllMessages } from '../../../redux/actions/messagesActions';
import styles from './messages.css';

const MessagesPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts) || [];
  const messages = useSelector((state) => state.messages.messages) || [];

  const [showModalSend, setShowModalSend] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [recipientNumber, setRecipientNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [numberSuggestions, setNumberSuggestions] = useState([]);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [editedMessageId, setEditedMessageId] = useState(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [showDeleteAllConfirmation, setShowDeleteAllConfirmation] = useState(false);

  const sendMessage = () => {
    const newMessage = {
      id: Date.now(),
      text: messageText,
      recipientName,
      recipientNumber,
    };

    const newContact = {
      fullName: recipientName,
      phoneNumber: recipientNumber,
    };

    const existingContact = contacts.find(
      (contact) =>
        contact.fullName.toLowerCase() === recipientName.toLowerCase() ||
        contact.phoneNumber === recipientNumber
    );

    if (!existingContact) {
      dispatch(addContact(newContact));
    }

    dispatch(addMessage(newMessage));
    closeModal();
  };

  const deleteMessageHandler = (id) => {
    dispatch(deleteMessage(id));
  };

  const clearAllMessagesHandler = () => {
    openDeleteAllConfirmation();
  };

  const handleClearAllMessages = () => {
    dispatch(clearAllMessages());
    closeDeleteAllConfirmation();
  };

  const getNumberSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : contacts.filter((contact) => 
          contact.phoneNumber && contact.phoneNumber.toLowerCase().includes(inputValue)
        );
  };

  const getNameSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : contacts.filter((contact) => 
          contact.fullName && contact.fullName.toLowerCase().includes(inputValue)
        );
  };

  const onNumberChange = (e) => {
    const value = e.target.value || '';
    setRecipientNumber(value);
    setNumberSuggestions(getNumberSuggestions(value));
  };

  const onNameChange = (e) => {
    const value = e.target.value || '';
    setRecipientName(value);
    setNameSuggestions(getNameSuggestions(value));
  };

  const onNumberSuggestionClick = (suggestion) => {
    setRecipientNumber(suggestion.phoneNumber || '');
    setRecipientName(getRecipientNameByNumber(suggestion.phoneNumber));
    setNumberSuggestions([]);
  };
  
  const onNameSuggestionClick = (suggestion) => {
    setRecipientName(suggestion.fullName || '');
    setRecipientNumber(getRecipientNumberByName(suggestion.fullName));
    setNameSuggestions([]);
  };
  
  const getRecipientNameByNumber = (number) => {
    const contact = contacts.find((c) => c.phoneNumber === number);
    return contact ? contact.fullName : '';
  };
  
  const getRecipientNumberByName = (name) => {
    const contact = contacts.find((c) => c.fullName === name);
    return contact ? contact.phoneNumber : '';
  };

  const openModalSend = () => {
    setShowModalSend(true);
  } 
  
  const openModalEdit = () => setShowModalEdit(true);

  const closeModal = () => {
    setShowModalSend(false);
    setShowModalEdit(false);
    setMessageText('');
    setRecipientNumber('');
    setRecipientName('');
    setEditedMessageId(null);
    setNameSuggestions([]);
    setNumberSuggestions([])
  };

  const handleMouseEnter = (id) => {
    setHoveredMessageId(id);
  };
  
  const handleMouseLeave = () => {
    setHoveredMessageId(null);
  };

  const editMessageHandler = (id) => {
    const editedMessage = messages.find((message) => message.id === id);
    setMessageText(editedMessage.text);
    setRecipientNumber(editedMessage.recipientNumber);
    setRecipientName(editedMessage.recipientName);
    setEditedMessageId(id);
    openModalEdit();
  };

  const updateMessage = () => {
    if (editedMessageId) {
      const updatedMessage = {
        id: editedMessageId,
        text: messageText,
        recipientName,
        recipientNumber,
      };

      dispatch(editMessage(editedMessageId, updatedMessage));
      closeModal();
    }
  };

  const openDeleteAllConfirmation = () => {
    setShowDeleteAllConfirmation(true);
  };

  const closeDeleteAllConfirmation = () => {
    setShowDeleteAllConfirmation(false);
  };

  return (
    <div className='messages-page'>
      {(showModalSend || showModalEdit || showDeleteAllConfirmation) && (
        <div className='modal-overlay'></div>
      )}

      <h1 className='fs-2 m-4'>Messages Page</h1>
      <div className='d-flex flex-column gap-3'>
        <div>
          <button className='button me-2' onClick={openModalSend}>
            Send Message
          </button>
          <button className='button button-danger' onClick={clearAllMessagesHandler}>
            Delete All Messages
          </button>
        </div>

        {(showModalSend || showModalEdit) && (
          <div className='modal' style={{ display: 'block' }}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-body'>
                  <button type='button' className='btn-close align-self-end' onClick={closeModal}></button>
                  <div className='mb-3'>
                    <label className='form-label'>Recipient's number</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Write number'
                      value={recipientNumber}
                      onChange={onNumberChange}
                    />
                    {numberSuggestions.length > 0 && (
                      <ul className='list-group mt-1'>
                        {numberSuggestions.map((contact) => (
                          <li
                            key={contact.id}
                            className='list-group-item'
                            onClick={() => onNumberSuggestionClick(contact)}
                          >
                            {contact.phoneNumber}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Recipient's name</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Write name'
                      value={recipientName}
                      onChange={onNameChange}
                    />
                    {nameSuggestions.length > 0 && (
                      <ul className='list-group mt-1'>
                        {nameSuggestions.map((contact) => (
                          <li
                            key={contact.id}
                            className='list-group-item'
                            onClick={() => onNameSuggestionClick(contact)}
                          >
                            {contact.fullName}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Message text</label>
                    <textarea
                      className='form-control'
                      placeholder='Write message text'
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className='modal-footer'>
                
                  <button type='button' className='button button-modal btn-secondary' onClick={closeModal}>
                    Cancel
                  </button>
                  { showModalSend ? (
                    <button type='button' className='button button-modal btn-primary' onClick={sendMessage}>
                      Send
                    </button>
                  ) : (
                    <button type='button' className='button button-modal btn-primary' onClick={updateMessage}>
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <ul className='list-group d-flex flex-column gap-3'>
          {messages.map((message) => (
            <li
              key={message.id}
              className='list-group-item d-flex justify-content-between'
              onMouseEnter={() => handleMouseEnter(message.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="message-details">
                <div className='d-flex'>
                  <div className="message-label">{`Message: `}</div>
                  <div className="message-text">{message.text}</div>
                </div>
                <div className="recipient-details">
                  <span className="recipient-label">Recipient:</span>
                  <span className="recipient-name">{message.recipientName}</span>
                  <span className="recipient-number"> {message.recipientNumber}</span>
                </div>
              </div>

              {hoveredMessageId === message.id && (
                <div>
                  <button className='button button-modal btn-warning me-2' onClick={() => editMessageHandler(message.id)}>
                    Edit
                  </button>
                  <button className='button button-modal button-danger' onClick={() => deleteMessageHandler(message.id)}>
                    X
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {showDeleteAllConfirmation && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-body fw-bold fs-2'>
                <p>Are you sure you want to delete all messages?</p>
              </div>
              <div className='modal-footer'>
                <button type='button' className='button button-modal btn-secondary' onClick={closeDeleteAllConfirmation}>
                  Cancel
                </button>
                <button type='button' className='button button-modal btn-danger' onClick={handleClearAllMessages}>
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

export default MessagesPage;