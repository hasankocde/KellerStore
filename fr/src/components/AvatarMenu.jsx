// AvatarMenu.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useKellerCall from "../hooks/useKellerCall";
import useAuthCall from "../hooks/useAuthCall"; // Ensure this import is correct

const AvatarMenu = ({ onLogout }) => {
  const { logout } = useAuthCall(); // Use the logout function from useAuthCall
  const { getUserData } = useKellerCall();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // State to hold user data
  const menuRef = useRef();

  const navigation = [
    { title: "Profile", path: "/profile" },
    { title: "Logout" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      }
    };
    fetchUser();
  }, []);

  const handleMenuClick = async (title, path) => {
    if (title === "Logout") {
      await logout(); // Ensure the logout function is awaited
      setUser(null); // Clear the user data from local state
      localStorage.removeItem('token'); // Clear any stored token
      onLogout(); // Call the onLogout function passed from Navbar
      navigate('/login'); // Redirect to the login page after logout
    } else {
      navigate(path);
    }
    setMenuOpen(false);
  };
  

  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="w-12 h-12 outline-none rounded-full ring-offset-2 ring-gray-200 focus:ring-2 focus:ring-button-blue"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {user && user.avatar ? (
          <img
            src={`${baseUrl}${user.avatar.replace(/\\/g, '/')}`} // Use the fetched avatar URL
            className="w-full h-full rounded-full"
            alt="Profile"
          />
        ) : (
          <img
            src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
            className="w-full h-full rounded-full"
            alt="Profile"
          />
        )}
      </button>
      <ul
        className={`bg-white mt-2 space-y-2 absolute right-0 border rounded-md w-full md:w-40 shadow-md ${
          menuOpen ? "" : "hidden"
        }`}
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            <button
              className="w-full text-left block text-gray-600 hover:bg-button-blue hover:text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={() => handleMenuClick(item.title, item.path)}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvatarMenu;
