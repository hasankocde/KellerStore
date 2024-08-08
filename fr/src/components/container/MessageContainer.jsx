import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useKellerCall from '../../hooks/useKellerCall';
import MessageList from './message/MessageList';
import MessageView from './message/MessageView';
import MessageInput from './message/MessageInput';
import MessageActions from './message/MessageActions';
import DeleteModal from './message/DeleteModal';
import MestoAdContainer from './MestoAdContainer'; 

const BASE_URL = import.meta.env.VITE_BASE_URL;

const MessageContainer = ({ handleRefresh, onMessageCountUpdate }) => {
  const [groupedMessages, setGroupedMessages] = useState({});
  const [adDetails, setAdDetails] = useState({});
  const [firstMessageSenders, setFirstMessageSenders] = useState({});
  const [newMessage, setNewMessage] = useState({});
  const [adIds, setAdIds] = useState({});
  const [recipientIds, setRecipientIds] = useState({});
  const [participantNames, setParticipantNames] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState(null);
  const [selectedAd, setSelectedAd] = useState(null);

  const { getKellerData, postKellerData, getAdData, updateMessageReadStatus, deleteConversation } = useKellerCall();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    getKellerData('messages')
      .then((data) => {
        if (data && data.length > 0) {
          const adDetails = {};
          const firstSenders = {};
          const grouped = {};
          const adIds = {};
          const recipientIds = {};
          const names = {};
          const unread = {};
          data.forEach((conversation) => {
            if (conversation.adId && conversation.adId.ownerId && conversation.messages) {
              adDetails[conversation._id] = {
                title: conversation.adId.title,
                image: `${BASE_URL}${conversation.adId.images[0]}`,
                images: conversation.adId.images || [],
                isReserved: conversation.adId.isReserved,
                reservedUserId: conversation.adId.reservedUserId,
                isSold: conversation.adId.isSold,
                soldUserId: conversation.adId.soldUserId,
                ownerId: conversation.adId.ownerId._id,
                categoryId: conversation.adId.categoryId,
                subcategoryId: conversation.adId.subcategoryId,
                PLZ: conversation.adId.PLZ,
                price: conversation.adId.price,
                favoriteCount: conversation.adId.favoriteCount,
                countOfVisitors: conversation.adId.countOfVisitors,
                adId: conversation.adId._id
              };
              firstSenders[conversation._id] = conversation.messages[0]?.senderId._id;
              adIds[conversation._id] = conversation.adId._id;
              const recipient = conversation.participants.find((p) => p._id !== currentUser);
              recipientIds[conversation._id] = recipient._id;
              names[conversation.messages[0]?.senderId._id] = conversation.messages[0]?.senderId.firstName;
              names[conversation.adId.ownerId._id] = conversation.adId.ownerId.firstName;
              grouped[conversation._id] = conversation.messages.map((message) => ({
                ...message,
                conversationId: conversation._id,
                adOwnerId: conversation.adId.ownerId._id,
              }));
              unread[conversation._id] = conversation.messages.filter((message) => !message.isRead && message.senderId._id !== currentUser).length;
            }
          });

          setAdDetails(adDetails);
          setFirstMessageSenders(firstSenders);
          setGroupedMessages(grouped);
          setAdIds(adIds);
          setRecipientIds(recipientIds);
          setParticipantNames(names);
          setUnreadCounts(unread);
        }
      })
      .catch((err) => console.error(err));
  }, [currentUser, refreshKey]);

  const handleInputChange = (conversationId, text) => {
    setNewMessage({
      ...newMessage,
      [conversationId]: text,
    });
  };

  const handleSend = async (conversationId) => {
    const messageText = newMessage[conversationId];
    if (messageText && adIds[conversationId] && recipientIds[conversationId]) {
      try {
        const message = {
          adId: adIds[conversationId],
          message: messageText,
          recipientId: recipientIds[conversationId],
        };
        const response = await postKellerData(`messages`, message);

        setGroupedMessages((prevGroupedMessages) => {
          const updatedMessages = prevGroupedMessages[conversationId]
            ? [...prevGroupedMessages[conversationId], response]
            : [response];
          return {
            ...prevGroupedMessages,
            [conversationId]: updatedMessages,
          };
        });

        setNewMessage({
          ...newMessage,
          [conversationId]: '',
        });

        setRefreshKey((prevKey) => prevKey + 1);
        if (handleRefresh) handleRefresh(); // Refresh icon
      } catch (err) {
        console.error('Failed to send message', err);
      }
    }
  };

  const handleReservationToggle = async (adId) => {
    const adData = await getAdData(adId);
    if (adData) {
      const updatedAdDetails = { ...adDetails };

      Object.keys(adDetails).forEach((conversationId) => {
        if (adIds[conversationId] === adId) {
          updatedAdDetails[conversationId] = {
            ...adDetails[conversationId],
            isReserved: adData.isReserved,
            reservedUserId: adData.reservedUserId,
          };
        }
      });

      setAdDetails(updatedAdDetails);
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  const handleSoldToggle = async (adId) => {
    const adData = await getAdData(adId);
    if (adData) {
      const updatedAdDetails = { ...adDetails };

      Object.keys(adDetails).forEach((conversationId) => {
        if (adIds[conversationId] === adId) {
          updatedAdDetails[conversationId] = {
            ...adDetails[conversationId],
            isSold: adData.isSold,
            soldUserId: adData.soldUserId,
          };
        }
      });

      setAdDetails(updatedAdDetails);
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  const handleConversationClick = async (conversationId) => {
    setSelectedConversationId(conversationId);
    try {
      await updateMessageReadStatus(conversationId);
      setRefreshKey((prevKey) => prevKey + 1);
      if (handleRefresh) handleRefresh(); // Refresh icon
      // After updating read status, update the count in MessageIcon
      onMessageCountUpdate(); // Assuming you pass a function from Navbar
      if (handleRefresh) handleRefresh(); 
    } catch (err) {
      console.error('Failed to update message read status', err);
    }
  };

  const handleDeleteClick = (conversationId) => {
    setConversationToDelete(conversationId);
    setIsDeleteModalOpen(true);
  };

  const handleAdImageClick = async (adDetails) => {
    const adData = await getAdData(adDetails.adId); // Fetch the ad details with owner populated
    if (adData) {
      const formattedAdData = formatAdData(adData);
      setSelectedAd(formattedAdData);
    }
  };

  const formatAdData = (adData) => {
    return {
      ...adData,
      _id: adData._id,
      PLZ: adData.PLZ || '',
      categoryId: adData.categoryId ? {
        _id: adData.categoryId._id,
        categoryName: adData.categoryId.categoryName
      } : null,
      subcategoryId: adData.subcategoryId ? {
        _id: adData.subcategoryId._id,
        name: adData.subcategoryId.name
      } : null,
      content: adData.content || '',
      countOfVisitors: adData.countOfVisitors || 0,
      createdAt: adData.createdAt || '',
      images: adData.images || [],
      isPublish: adData.isPublish || false,
      isReserved: adData.isReserved || false,
      isSold: adData.isSold || false,
      messages: adData.messages || [],
      ownerId: adData.ownerId ? {
        _id: adData.ownerId._id,
        firstName: adData.ownerId.firstName,
        lastName: adData.ownerId.lastName,
        email: adData.ownerId.email
      } : null,
      price: adData.price || 0,
      priceChanged: adData.priceChanged || false,
      
      title: adData.title || '',
      updatedAt: adData.updatedAt || '',
      visitedUser: adData.visitedUser || [],
    };
  };

  const handleDeleteConfirm = async () => {
    if (conversationToDelete) {
      try {
        await deleteConversation(conversationToDelete); // Updated method to use
        const updatedGroupedMessages = { ...groupedMessages };
        delete updatedGroupedMessages[conversationToDelete];
        setGroupedMessages(updatedGroupedMessages);

        const updatedAdDetails = { ...adDetails };
        delete updatedAdDetails[conversationToDelete];
        setAdDetails(updatedAdDetails);

        const updatedFirstSenders = { ...firstMessageSenders };
        delete updatedFirstSenders[conversationToDelete];
        setFirstMessageSenders(updatedFirstSenders);

        const updatedAdIds = { ...adIds };
        delete updatedAdIds[conversationToDelete];
        setAdIds(updatedAdIds);

        const updatedRecipientIds = { ...recipientIds };
        delete updatedRecipientIds[conversationToDelete];
        setRecipientIds(updatedRecipientIds);

        const updatedParticipantNames = { ...participantNames };
        delete updatedParticipantNames[conversationToDelete];
        setParticipantNames(updatedParticipantNames);

        const updatedUnreadCounts = { ...unreadCounts };
        delete updatedUnreadCounts[conversationToDelete];
        setUnreadCounts(updatedUnreadCounts);

        setSelectedConversationId(null);
        setIsDeleteModalOpen(false);
        setConversationToDelete(null);
        setRefreshKey((prevKey) => prevKey + 1);
        if (handleRefresh) handleRefresh(); // Refresh icon
      } catch (err) {
        console.error('Failed to delete conversation', err);
      }
    }
  };

  const renderMessage = (message, firstSenderId) => {
    const senderId = message.senderId._id;
    const isCurrentUserSender = senderId === currentUser;
    const isSenderCustomer = senderId === firstSenderId;
    const senderFirstName = participantNames[senderId];
    const recipientFirstName = participantNames[message.adOwnerId] || participantNames[firstSenderId];
    const isCurrentUserOwner = adDetails[selectedConversationId]?.ownerId === currentUser;

    return (
      <div
        key={message._id}
        className={`mt-3 mb-7 flex items-center ${isCurrentUserSender ? 'justify-end' : 'justify-start'} gap-5 px-3`}
      >
        <div className="w-3/6">
          <p
            className={`border ${isCurrentUserSender ? 'border-light-grey bg-gray-300 text-black' : 'border-button-blue bg-button-blue text-white'} p-3 rounded-lg`}
          >
            {message.messageText}
          </p>
          <div className={`text-sm ${isCurrentUserSender ? 'text-right' : 'text-left'}`}>
            {isCurrentUserSender 
              ? isCurrentUserOwner 
                ? `Verkäufer - ${recipientFirstName}` 
                : `Kunde - ${senderFirstName}`
              : isSenderCustomer 
                ? `Kunde - ${senderFirstName}` 
                : `Verkäufer - ${recipientFirstName}`}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full">
      <MessageList 
        adDetails={adDetails} 
        unreadCounts={unreadCounts} 
        handleConversationClick={handleConversationClick} 
        handleDeleteClick={handleDeleteClick} 
      />
      <div className="w-3/4 p-5">
        {selectedConversationId && !selectedAd && (
          <div className="border w-full bg-light-grey pb-7 rounded-lg">
            <MessageView 
              groupedMessages={groupedMessages} 
              selectedConversationId={selectedConversationId} 
              renderMessage={renderMessage} 
              firstMessageSenders={firstMessageSenders} 
              adDetails={adDetails} 
              currentUser={currentUser}
              onAdImageClick={handleAdImageClick} 
            />
            <MessageInput 
              selectedConversationId={selectedConversationId} 
              newMessage={newMessage} 
              handleInputChange={handleInputChange} 
              handleSend={handleSend} 
            />
            <MessageActions 
              selectedConversationId={selectedConversationId} 
              adDetails={adDetails} 
              adIds={adIds} 
              recipientIds={recipientIds} 
              handleSoldToggle={handleSoldToggle} 
              handleReservationToggle={handleReservationToggle} 
              currentUser={currentUser} 
            />
          </div>
        )}
        {selectedAd && (
  <>
    {console.log("MestoAdContainer rendering with adDetails:", adDetails)}
    {console.log("MestoAdContainer rendering with selectedAd:", selectedAd)}
    {console.log("MestoAdContainer rendering with selectedConversationId:", selectedConversationId)}
    <MestoAdContainer 
      adDetails={adDetails} 
      selectedConversationId={selectedConversationId} 
      selectedAd={selectedAd} 
      handleBackClick={() => setSelectedAd(null)} 
    />
  </>
)}

      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default MessageContainer;
