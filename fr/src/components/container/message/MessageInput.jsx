// src/components/container/message/MessageInput.jsx

import React from 'react';

const MessageInput = ({ selectedConversationId, newMessage, handleInputChange, handleSend }) => {
  return (
    <div className="flex w-5/6 items-center mt-0 px-1 mb-1 border-2">
      <input
        type="text"
        value={newMessage[selectedConversationId] || ''}
        onChange={(e) => handleInputChange(selectedConversationId, e.target.value)}
        placeholder="Nachricht schreiben..."
        className="border rounded-lg p-2 w-full mb-1.5"
      />
      <button
        onClick={() => handleSend(selectedConversationId)}
        className="bg-blue-500 text-white rounded-lg p-1 ml-2 mb-1.5"
      >
        Schicken
      </button>
    </div>
  );
};

export default MessageInput;
// This component will handle the message input field and send button.