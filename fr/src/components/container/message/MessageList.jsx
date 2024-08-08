import React from 'react';

const MessageList = ({ adDetails, unreadCounts, handleConversationClick, handleDeleteClick }) => {
  return (
    <div className="w-1/4 border-r overflow-y-auto">
      {Object.entries(adDetails).map(([conversationId, details]) => (
        <div
          key={conversationId}
          className="flex flex-wrap items-center rounded-lg p-3 cursor-pointer hover:bg-gray-300 justify-between border-2"
        >
          <div onClick={() => handleConversationClick(conversationId)} className="flex items-center cursor-pointer ">
            <img src={details.image} className="w-16 h-16 rounded-lg" alt="Ad" />
            <div className="ml-3">
              <h2 className="text-lg">{details.title}</h2>
              {unreadCounts[conversationId] > 0 && (
                <span className="text-sm text-red-500">Neue Nachricht: {unreadCounts[conversationId]}</span>
              )}
            </div>
          </div>
          <button
            onClick={() => handleDeleteClick(conversationId)}
            className="bg-red-500 text-white p-0 rounded ml-0"
          >
            Löschen
          </button>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
