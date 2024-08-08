import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../cards/UserCard";
import useKellerCall from "../../hooks/useKellerCall";
import Banner from "../../components/Banner";
import ProfileSidebar from "../../components/ProfileSidebar";
import CommonCard from "../../components/cards/CommonCard";
import '../../index.css';

const FollowingContainer = () => {
  const title = `Menschen, denen ich folge`;
  const [followedUsers, setFollowedUsers] = useState([]);
  const [selectedUserAds, setSelectedUserAds] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const currentUser = useSelector((state) => state.auth.currentUser);

  const { getKellerData } = useKellerCall();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const follows = await getKellerData('follows');
        const userFollows = follows.filter(follow => 
          follow.userId && follow.userId._id === currentUser
        ).map(follow => follow.followedUserId);
        setFollowedUsers(userFollows);
      } catch (error) {
        console.error("Error fetching followed users:", error);
      }
    };

    if (currentUser) {
      fetchFollowedUsers();
    }
  }, [currentUser]);

  const fetchUserAds = async (userId) => {
    try {
      const adsData = await getKellerData('ads');
      const userAds = adsData.filter(ad => ad.ownerId._id === userId);
      setSelectedUserAds(userAds);
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  const handleCardClick = (user) => {
    setSelectedUser(user);
    fetchUserAds(user._id);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
    setSelectedUserAds([]);
  };

  return (
    <>
      <div>
        <Banner title={title} target={"/allad"} />
      </div>
      <div className="flex flex-col md:flex-row flex-container">
        <div className="sidebar">
          <ProfileSidebar />
        </div>
        <div className="border w-full m-2 bg-light-grey pb-7 rounded-lg flex-grow main-content">
          <div className="flex justify-between items-center pt-3 pb-3">
            <h1 className="text-3xl ps-5 pt-5">{selectedUser ? `Anzeigen - ${selectedUser.firstName} ${selectedUser.lastName}` : "Menschen, denen ich folge"}</h1>
            {selectedUser && (
              <button button
              type="button"
              className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange "onClick={handleBackClick} >
                Zurück
              </button>
            )}
          </div>
          {!selectedUser ? (
            <div className="grid mx-7 my-2">
              {followedUsers.map((user) => (
                <UserCard key={user._id} user={user} baseUrl={baseUrl} onClick={() => handleCardClick(user)} />
              ))}
            </div>
          ) : (
            <div className="grid mx-7 my-2">
              {selectedUserAds.map((ad) => (
                <CommonCard key={ad._id} ad={ad} baseUrl={baseUrl} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FollowingContainer;
