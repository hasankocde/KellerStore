import React, { useState, useEffect } from 'react';
import useKellerCall from '../../hooks/useKellerCall';

const ReservationButton = ({ conversationId, adId, recipientId, isReservedInitially, reservedUserId, isSold, onToggle }) => {
  const [isReserved, setIsReserved] = useState(isReservedInitially);
  const [reservedUser, setReservedUser] = useState(reservedUserId);
  const { putKellerData, getAdData } = useKellerCall();

  useEffect(() => {
    setIsReserved(isReservedInitially);
    setReservedUser(reservedUserId);
  }, [isReservedInitially, reservedUserId]);

  const handleToggleReserve = async () => {
    if (adId && !isSold) {
      try {
        const updatedAd = {
          _id: adId,
          isReserved: !isReserved,
          reservedUserId: !isReserved ? recipientId : undefined,
        };
        await putKellerData('ads', updatedAd);
        const adData = await getAdData(adId);
        setIsReserved(adData.isReserved);
        setReservedUser(adData.reservedUserId);
        onToggle();
      } catch (err) {
        console.error("Failed to toggle reservation status", err);
      }
    }
  };

  return (
    <button
      onClick={handleToggleReserve}
      className={`bg-green-500 text-white rounded-lg p-2 w-full ${isReserved && reservedUser !== recipientId ? 'cursor-not-allowed' : ''}`}
      disabled={isReserved && reservedUser !== recipientId || isSold}
      style={{ marginLeft: '2mm' }}
    >
      {isReserved ? (reservedUser === recipientId ? 'Reservierung stornieren' : 'Für jemand anderen reserviert') : 'Reservieren'}
    </button>
  );
};

export default ReservationButton;


