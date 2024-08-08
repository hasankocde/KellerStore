import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useAuth } from "../../helper/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const MessageIcon = () => {
  const navigate = useNavigate();
  const [newMessageCount, setNewMessageCount] = useState(0);

  const { isAuthenticated } = useAuth();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      if (!isAuthenticated || !token) {
        console.log("User not authenticated or no token available");
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}messages/unread-count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNewMessageCount(response.data.count);
      } catch (error) {
        console.error("Failed to fetch unread messages count", error);
      }
    };

    const intervalId = setInterval(() => {
      if (isAuthenticated && token) {
        fetchUnreadMessages();
      }
    }, 2000); // 2 saniyede bir sorgulama

    return () => clearInterval(intervalId); // Temizleme işlevi
  }, [isAuthenticated, token]);

  const handleClick = () => {
    setNewMessageCount(0);
    navigate("/message");
  };

  return isAuthenticated ? (
    <button
      className="relative hover:shadow-lg active:translate-y-1 rounded-full p-1"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
      {newMessageCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-button-blue rounded-full">
          {newMessageCount}
        </span>
      )}
    </button>
  ) : null;
};

export default MessageIcon;
