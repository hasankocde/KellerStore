import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailSidebar from '../components/DetailSidebar';
import MessageModal from '../components/modals/MessageModal';
import DeleteConfirmationModal from '../components/modals/DeleteConfirmationModal';
import useKellerCall from '../hooks/useKellerCall';
import { useSelector } from 'react-redux';
import DetailCard from '../components/cards/DetailCard';
import '../index.css';

const Detail = ({ selectedAd }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Use selectedAd if available, otherwise use ad from location.state
  const ad = selectedAd || location.state?.ad;
  console.log(ad)

  if (!ad) {
    return <div>Ad details not available</div>;
  }

  const { ownerId } = ad;
  console.log(ownerId)
  
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [favoriteCount, setFavoriteCount] = useState(ad.favoriteCount || 0);
  const [viewCount, setViewCount] = useState(ad.countOfVisitors || 0);
  const { postKellerData, deleteFavoriteData, getFavoritesData, getFavoriteCount, deleteKellerData, incrementViewCount } = useKellerCall();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const favorite = await getFavoritesData(ad._id);
      if (favorite) {
        setFavorite(true);
        setFavoriteId(favorite._id);
      }
    };

    const fetchFavoriteCount = async () => {
      const count = await getFavoriteCount(ad._id);
      setFavoriteCount(count);
    };

    const incrementAndFetchViewCount = async () => {
      console.log("Incrementing view count for ad:", ad._id);
      const updatedAd = await incrementViewCount(ad._id);
      console.log("Updated ad data after incrementing view count:", updatedAd);
      setViewCount(updatedAd.countOfVisitors);
    };

    fetchFavoriteStatus();
    fetchFavoriteCount();
    incrementAndFetchViewCount();
  }, [ad._id, getFavoriteCount, getFavoritesData, incrementViewCount]);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await deleteFavoriteData('favorites', favoriteId);
        setFavorite(false);
        setFavoriteId(null);
        setFavoriteCount(favoriteCount - 1);
      } else {
        const newFavorite = await postKellerData('favorites', { adId: ad._id });
        setFavorite(true);
        setFavoriteId(newFavorite.data._id);
        setFavoriteCount(favoriteCount + 1);
      }
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  const handleSend = async (messageText) => {
    try {
      const message = {
        adId: ad._id,
        message: messageText,
        recipientId: ownerId._id
      };
      const response = await postKellerData('messages', message);
      console.log("Message sent:", response);
    } catch (error) {
      console.error("Failed to send message", error);
    }
    setMessageModalVisible(false);
  };

  const handleDeleteAd = async () => {
    try {
      await deleteKellerData('ads', ad._id);
      navigate('/myads'); // Redirect to myads page after deletion
    } catch (error) {
      console.error("Failed to delete ad", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div>
        <DetailSidebar owner={ownerId} />
      </div>
      <div className="flex-grow max-w-screen-md w-full m-10 bg-light-grey pb-7 rounded-lg flex justify-center items-center">
        <DetailCard
          ad={ad}
          isFavorite={isFavorite}
          handleFavoriteToggle={handleFavoriteToggle}
          favoriteCount={favoriteCount}
          viewCount={viewCount}
          currentUser={currentUser}
          ownerId={ownerId}
          setMessageModalVisible={setMessageModalVisible}
          navigate={navigate}
          setDeleteModalVisible={setDeleteModalVisible}
        />
        <MessageModal
          isVisible={isMessageModalVisible}
          onClose={() => setMessageModalVisible(false)}
          onSend={handleSend}
        />
        <DeleteConfirmationModal
          isVisible={isDeleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={handleDeleteAd}
        />
      </div>
    </div>
  );
};

export default Detail;


