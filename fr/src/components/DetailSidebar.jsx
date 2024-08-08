import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SlUserFollow } from "react-icons/sl";
import useKellerCall from "../hooks/useKellerCall";

// Buttons Infos
const DetailButtons = [
  { name: "Nachricht", path: "/message" },
  { name: "Merkliste", path: "/wishlist" },
  { name: "Folgen", path: "/following" },
];

const DetailSidebar = ({ owner }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followId, setFollowId] = useState(null);
  const [followCount, setFollowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 
  const { postFollowData, deleteFollowData, getFollowData, getFollowCount } = useKellerCall();

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const follow = await getFollowData(owner._id);
        if (follow) {
          setIsFollowed(true);
          setFollowId(follow._id);
        }
      } catch (error) {
        console.error("Failed to fetch follow status", error);
      }
      setIsLoading(false); 
    };

    const fetchFollowCount = async () => {
      try {
        const count = await getFollowCount(owner._id);
        setFollowCount(count);
      } catch (error) {
        console.error("Failed to fetch follow count", error);
      }
    };

    fetchFollowStatus();
    fetchFollowCount();
  }, []);

  const handleFollowToggle = async () => {
    if (isLoading) return; 

    try {
      if (isFollowed) {
        await deleteFollowData(followId);
        setIsFollowed(false);
        setFollowId(null);
        setFollowCount(followCount - 1);
      } else {
        const newFollow = await postFollowData({ followedUserId: owner._id });
        setIsFollowed(true);
        setFollowId(newFollow.data._id);
        setFollowCount(followCount + 1);
      }
    } catch (error) {
      console.error("Failed to toggle follow", error);
    }
  };

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <nav className="bg-background-filter-light-blue space-y-3 sm:w-80 py-5 ms-3 my-3 me-2 mt-10 rounded-lg">
        <div className="text-center text-white">
          <div>
            {currentUser === owner._id ? (
              <h1>Ihre Werbung</h1>
            ) : (
              <>
                <h1>Inserent: {owner.firstName} {owner.lastName}</h1>
                <h4>Aktif seit {new Date(owner.createdAt).toLocaleDateString()}</h4>
              </>
            )}
          </div>
        </div>
        <div className="text-center">
          <div className="text-center relative favorite-badge">
            <button
              onClick={handleFollowToggle}
              className={`border-2 p-2 rounded-full ${isFollowed ? 'bg-red-500 text-white' : 'bg-like-yellow text-white'}`}
              disabled={isLoading}
            >
              <SlUserFollow size={25} />
            </button>
            <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs rounded-full px-2 py-0.5">
              {followCount}
            </span>
          </div>
        </div>
        {DetailButtons.map((x) => {
          return (
            <div className="text-center" key={x.name}>
              <button
                onClick={() => handleClick(x.path)}
                className="btnProfile mt-3"
              >
                {x.name}
              </button>
            </div>
          );
        })}
      </nav>
    </>
  );
};

export default DetailSidebar;


