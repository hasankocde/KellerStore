import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../cards/UserCard";
import useKellerCall from "../../hooks/useKellerCall";
import Banner from "../Banner";
import ProfileSidebar from "../ProfileSidebar";
import CommonCard from "../cards/CommonCard";
import '../../index.css';

const FollowersContainer = () => {
  const title = `meine Abonnenten`;
  const [followers, setFollowers] = useState([]);
  const [selectedUserAds, setSelectedUserAds] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const currentUser = useSelector((state) => state.auth.currentUser);

  const { getFollowers, getKellerData } = useKellerCall();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        console.log("Fetching follows data...");
        const follows = await getFollowers(currentUser); // Pass the correct parameter
        console.log("Follows data:", follows);
        const userFollowers = follows.map(follow => follow.userId);
        console.log("User followers:", userFollowers);
        setFollowers(userFollowers);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    if (currentUser) {
      console.log("Current user:", currentUser);
      fetchFollowers();
    } else {
      console.log("No current user found.");
    }
  }, [currentUser]);

  const fetchUserAds = async (userId) => {
    try {
      console.log("Fetching ads for user:", userId);
      const adsData = await getKellerData('ads');
      console.log("Ads data:", adsData);
      const userAds = adsData.filter(ad => ad.ownerId._id === userId);
      console.log("User ads:", userAds);
      setSelectedUserAds(userAds);
    } catch (error) {
      console.error("Error fetching user ads:", error);
    }
  };

  const handleCardClick = (user) => {
    console.log("User card clicked:", user);
    setSelectedUser(user);
    fetchUserAds(user._id);
  };

  const handleBackClick = () => {
    console.log("Back button clicked.");
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
            <h1 className="text-3xl ps-5 pt-5">{selectedUser ? `Anzeigen - ${selectedUser.firstName} ${selectedUser.lastName}` : "meine Abonnenten"}</h1>
            {selectedUser && (
              <button
                type="button"
                className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange"
                onClick={handleBackClick}
              >
                Zurück
              </button>
            )}
          </div>
          {!selectedUser ? (
            <div className="grid mx-7 my-2">
              {followers.length > 0 ? followers.map((user) => (
                <UserCard key={user._id} user={user} baseUrl={baseUrl} onClick={() => handleCardClick(user)} />
              )) : <p>No followers found.</p>}
            </div>
          ) : (
            <div className="grid mx-7 my-2">
              {selectedUserAds.length > 0 ? selectedUserAds.map((ad) => (
                <CommonCard key={ad._id} ad={ad} baseUrl={baseUrl} />
              )) : <p>No ads found for this user.</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FollowersContainer;
