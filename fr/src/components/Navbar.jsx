import React, { useEffect, useState } from "react";
import { useAuth } from "../helper/AuthContext";
import Logo from "../assets/logo.png";
import NewAdButton from "./buttons/NewAdButton";
import RegisterButton from "./buttons/RegisterButton";
import LoginButton from "./buttons/LoginButton";
import MessageIcon from "./icons/MessageIcon";
import FavoriteIcon from "./icons/FavoriteIcon";
import AvatarMenu from "./AvatarMenu";
import DropdownMenu from "./DropdownMenu";
import { Link, useNavigate } from "react-router-dom";
import useKellerCall from "../hooks/useKellerCall";
import { useSelector, useDispatch } from "react-redux";


const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { isAuthenticated } = useAuth();
  const [followCount, setFollowCount] = useState(0);
  const [showFollowCount, setShowFollowCount] = useState(true);
  const { getFollowCount } = useKellerCall();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [PLZ, setPLZ] = useState("");
  const [radius, setRadius] = useState("Ganzer Ort");

  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchFollowCount = async () => {
      try {
        if (!isLoggedOut && isAuthenticated && currentUser) {
          const count = await getFollowCount(currentUser);
          setFollowCount(count);
        }
      } catch (error) {
        console.error("Failed to fetch follow count", error);
      }
    };

    fetchFollowCount();
  }, [isAuthenticated, currentUser, isLoggedOut]);


  const handleFavoriteClick = () => {
    setShowFollowCount(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim() || PLZ) {
      navigate('/combined-search', { state: { searchQuery: searchQuery.trim(), PLZ, radius } });
    }
  };


  const handleLogout = () => {
    setIsLoggedOut(true);
    setFollowCount(0);
    setShowFollowCount(false);
    // Dispatch an action to clear the auth state in Redux
    dispatch({ type: 'LOGOUT' });
  };


  return (
    <nav className="bg-white border-b z-50">
      <div className="flex flex-wrap items-center justify-between py-3 mx-5 md:px-8">
        <div className="flex-none lg:flex-initial">
          <Link to="/">
            <img src={Logo} width={120} height={50} alt="Logo" />
          </Link>
        </div>

        <div>
          <NewAdButton />
        </div>

        <div className="flex items-center space-x-2 border-2 rounded-md bg-gray-100 flex-grow flex-shrink max-w-[500px] order-3 md:order-none">
          <input
            className="w-full outline-none appearance-none placeholder-gray-500 pl-1 text-gray-500 sm:w-auto bg-gray-100 flex-grow"
            type="text"
            placeholder="Ad Suchen"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <input
            type="text"
            placeholder="PLZ"
            value={PLZ}
            onChange={(e) => setPLZ(e.target.value)}
            className="border rounded-md p-2 w-24 md:w-auto"
          />

          <select
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="border rounded-md p-2 md:w-auto"
          >
            <option value="Ganzer Ort">Ganzer Ort</option>
            <option value="5">+ 5 km</option>
            <option value="10">+ 10 km</option>
            <option value="20">+ 20 km</option>
            <option value="30">+ 30 km</option>
            <option value="50">+ 50 km</option>
            <option value="100">+ 100 km</option>
            <option value="150">+ 150 km</option>
            <option value="200">+ 200 km</option>
          </select>
          <button
            onClick={handleSearch}
            className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange whitespace-nowrap"
          >
            Suchen
          </button>
        </div>

        <div>
          <DropdownMenu />
        </div>

        {!isAuthenticated && (
          <>
            <div>
              <RegisterButton />
            </div>
            <div>
              <LoginButton />
            </div>
          </>
        )}

        {isAuthenticated && (
          <>
            <div>
              <MessageIcon />
            </div>

            <div>
              <FavoriteIcon count={followCount} showCount={showFollowCount} onClick={handleFavoriteClick} />
            </div>
            <div>
              <AvatarMenu onLogout={handleLogout} />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
