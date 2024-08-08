// src/components/container/message/MessageActions.jsx

import React from 'react';
import ReservationButton from '../../buttons/ReservationButton';
import SoldButton from '../../buttons/SoldButton';

const MessageActions = ({ selectedConversationId, adDetails, adIds, recipientIds, handleSoldToggle, handleReservationToggle, currentUser }) => {
  return (
    adDetails[selectedConversationId]?.ownerId === currentUser && (
      <div className="flex w-5/6 items-center px-0 mb-1.5 gap-0 border-2">
        {!adDetails[selectedConversationId]?.isReserved && (
          <SoldButton
            conversationId={selectedConversationId}
            adId={adIds[selectedConversationId]}
            recipientId={recipientIds[selectedConversationId]}
            isSoldInitially={adDetails[selectedConversationId]?.isSold}
            soldUserId={adDetails[selectedConversationId]?.soldUserId}
            isReserved={adDetails[selectedConversationId]?.isReserved}
            onToggle={() => handleSoldToggle(adIds[selectedConversationId])}
          />
        )}
        {!adDetails[selectedConversationId]?.isSold && (
          <ReservationButton
            conversationId={selectedConversationId}
            adId={adIds[selectedConversationId]}
            recipientId={recipientIds[selectedConversationId]}
            isReservedInitially={adDetails[selectedConversationId]?.isReserved}
            reservedUserId={adDetails[selectedConversationId]?.reservedUserId}
            isSold={adDetails[selectedConversationId]?.isSold}
            onToggle={() => handleReservationToggle(adIds[selectedConversationId])}
          />
        )}
      </div>
    )
  );
};

export default MessageActions;
// This component will handle the reservation and sold button actions.