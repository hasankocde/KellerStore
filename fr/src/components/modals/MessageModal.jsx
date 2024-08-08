import React, { useState } from "react";

const MessageModal = ({ isVisible, onClose, onSend }) => {
  const [message, setMessage] = useState("Hallo, steht dieses Produkt noch zum Verkauf?");

  if (!isVisible) {
    return null;
  }

  const handleSend = () => {
    onSend(message);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
      <div className="relative bg-gray-600 bg-opacity-50 w-full h-full">
        <div className="absolute top-1/3 right-1/4 bg-white p-5 rounded-lg shadow-lg pointer-events-auto">
          <h2 className="text-2xl mb-4">Eine Nachricht schicken</h2>
          <textarea
            id="message-input"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            rows="4"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSend}
            >
              Schicken
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
