import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileButtons = [
  { name: "Profile", path: "/profile" },
  { name: "Anzeige Aufgeben", path: "/newad" },
  { name: "Meine Anzeigen", path: "/myads" },
  { name: "Nachricht", path: "/message" },
  { name: "Merkliste", path: "/wishlist/" },
  { name: "Folgen", path: "/following" },
  { name: "Followers", path: "/followers" },
];

const ProfileSidebar = ({ setIsAdminView }) => {
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="bg-background-filter-light-blue space-y-2 sm:w-80 py-3 ms-3 mt-5 rounded-lg">
      {isAdmin && (
        <div className="text-center">
          <button
            onClick={() => setIsAdminView(true)}
            className="btnProfile mt-1 w-60"
          >
            Admin Dashboard
          </button>
        </div>
      )}
      {ProfileButtons.map((x) => (
        <div className="text-center" key={x.name}>
          <button
            onClick={() => handleClick(x.path)}
            className="btnProfile mt-1 w-60"
          >
            {x.name}
          </button>
        </div>
      ))}
    </nav>
  );
};

export default ProfileSidebar;
