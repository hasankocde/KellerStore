import React, { useState, useEffect } from "react";
import {
  fetchFail,
  fetchStart,
  registerSuccess,
  loginSuccess,
  logoutSuccess,
} from "../features/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useAuth } from "../helper/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  const { login: authContextLogin, logout: authContextLogout } = useAuth();
  const [triggerNewMessage, setTriggerNewMessage] = useState(false);

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      // Şifre validasyonu
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      if (!passwordRegex.test(userInfo.password)) {
        throw new Error("Password does not meet the required criteria.");
      }
  
      const { data } = await axios.post(`${BASE_URL}users/`, userInfo);
      toastSuccessNotify("Register performed");
      dispatch(registerSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      if (error.message === "Password does not meet the required criteria.") {
        toastErrorNotify("Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters (@$!%*?&).");
      } 
    }
  };
  

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/login/`, userInfo);
      dispatch(loginSuccess(data));
      authContextLogin();
      toastSuccessNotify("Login performed");
      navigate("/");
      setTriggerNewMessage(true);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login cannot be performed");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios.get(`${BASE_URL}auth/logout/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logoutSuccess());
      authContextLogout();
      toastSuccessNotify("Logout performed");
      navigate("/login");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Logout cannot be performed");
    }
  };

  return { register, login, logout, triggerNewMessage, setTriggerNewMessage };
};

export default useAuthCall;
