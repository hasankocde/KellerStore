import React, { useState } from "react";
import { useSelector } from 'react-redux';
import useKellerCall from '../../hooks/useKellerCall';

const ProfileSettingsContainer = () => {
  const { putKellerData, postKellerData } = useKellerCall();
  const currentUser = useSelector((state) => state.keller.users.find(user => user.id === state.auth.currentUser.id));

  // Updated to handle full user object
  const [userData, setUserData] = useState({
    id: currentUser?.id || "",
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    tel: currentUser?.tel || "",
    dateOfBirth: currentUser?.dateOfBirth || "",
  });

  // Initializes address data state
  const [addressData, setAddressData] = useState({
    street: "",
    homeNumber: "",
    city: "",
    zipCode: "",
    country: "",
    doorbellName: "",
  });

  // Function to update user data
  const updateUserData = async () => {
    if (userData.id) {
      await putKellerData("users", userData);
    }
  };

  // Function to create new address data
  const createAddressData = async () => {
    await postKellerData("addresses", addressData);
  };

  // Handles user data changes
  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handles address data changes
  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  // Handles form submission, calls update and create functions
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData();
    createAddressData();
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        {/* User Information Section */}
        <h2 className="text-xl font-bold mb-4">Update Your Profile</h2>
        {/* Fields dynamically generate from userData state */}
        {Object.keys(userData).map(key => 
          key !== 'id' && (
            <input
              key={key}
              type={key === 'dateOfBirth' ? 'date' : 'text'}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              value={userData[key]}
              onChange={handleUserChange}
              required={key !== 'tel'}
            />
          )
        )}
        {/* Address Information Section */}
        <h2 className="text-xl font-bold mb-4 mt-8">Address Information</h2>
        {/* Fields dynamically generate from addressData state */}
        {Object.keys(addressData).map(key => (
          <input
            key={key}
            type={key === 'zipCode' ? 'number' : 'text'}
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
            value={addressData[key]}
            onChange={handleAddressChange}
            required
          />
        ))}
        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileSettingsContainer;












**************************

rout validat

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import axios from 'axios';

const PrivateRouter = () => {
  const { currentUser, token } = useSelector((state) => state.auth);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}auth/validate`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setIsValid(response.data.isValid);
        } catch (error) {
          setIsValid(false);
        }
      }
      setIsLoading(false);
      
    };
  
    checkToken();
  }, [token, BASE_URL]);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return currentUser && isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;

