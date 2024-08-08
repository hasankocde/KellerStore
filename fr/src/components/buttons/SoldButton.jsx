import React, { useState, useEffect } from 'react';
import useKellerCall from '../../hooks/useKellerCall';

const SoldButton = ({ conversationId, adId, recipientId, isSoldInitially, soldUserId, isReserved, onToggle }) => {
  const [isSold, setIsSold] = useState(isSoldInitially);
  const [soldUser, setSoldUser] = useState(soldUserId);
  const { putKellerData, getAdData } = useKellerCall();

  useEffect(() => {
    setIsSold(isSoldInitially);
    setSoldUser(soldUserId);
  }, [isSoldInitially, soldUserId]);

  const handleToggleSold = async () => {
    if (adId && !isReserved) {
      try {
        const updatedAd = {
          _id: adId,
          isSold: !isSold,
          soldUserId: !isSold ? recipientId : undefined,
        };
        await putKellerData('ads', updatedAd);
        const adData = await getAdData(adId);
        setIsSold(adData.isSold);
        setSoldUser(adData.soldUserId);
        onToggle();
      } catch (err) {
        console.error("Failed to toggle sold status", err);
      }
    }
  };

  return (
    <button
      onClick={handleToggleSold}
      className={`bg-red-500 text-white rounded-lg p-2 w-full ${isSold && soldUser !== recipientId ? 'cursor-not-allowed' : ''}`}
      disabled={isSold && soldUser !== recipientId || isReserved}
      style={{ marginRight: '2mm' }}
    >
      {isSold ? (soldUser === recipientId ? 'Verkauf abbrechen' : 'an jemand anderen verkauft') : 'Anzeige verkaufen'}
    </button>
  );
};

export default SoldButton;


