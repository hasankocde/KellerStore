import React from 'react';

const MessageView = ({ groupedMessages, selectedConversationId, renderMessage, firstMessageSenders, adDetails, currentUser, onAdImageClick }) => {
  const messages = groupedMessages[selectedConversationId];

  return (
    <div >
      {selectedConversationId && (
        <div className=" w-5/6 bg-light-grey pb-7 rounded-lg ">
          <div className="flex justify-between items-center pt--1 pb-3">
            <h1 className="text-3xl ps-5 pt-5">Nachricht</h1>
          </div>
          <div className="bg-white rounded-lg border-2">
            <div className="mt-2 flex flex-wrap items-center justify-start gap-2 border-b border-b-black mx-3 pb-2 cursor-pointer" onClick={() => onAdImageClick(adDetails[selectedConversationId])}>
              <img
                src={adDetails[selectedConversationId]?.image} 
                className="w-32 h-32 rounded-lg border-2"
                alt="Ad"
              />
              <div>
                <h1 className="text-xl ">{adDetails[selectedConversationId]?.title}</h1>
              </div>
            </div>
            {messages && messages.map((message) =>
              message && message.messageText ? renderMessage(message, firstMessageSenders[selectedConversationId]) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageView;
