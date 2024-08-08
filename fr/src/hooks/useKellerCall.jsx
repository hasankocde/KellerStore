import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/kellerSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useKellerCall = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();

  const deleteKellerData = async (url, id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`${url}/${id}`);
      toastSuccessNotify("Operation success");
      getKellerData(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
    }
  };

  const putKellerData = async (url, body) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${url}/${body._id}`, body);
      const updatedData = await getKellerData(url);
      toastSuccessNotify("Operation successful");
      return updatedData;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
    }
  };

  const putUserData = async (url, body, isFormData = false) => {
    dispatch(fetchStart());
    try {
      const config = isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};
      const response = await axiosWithToken.put(url, body, config);
      dispatch(getSuccess({ data: response.data, url }));
      toastSuccessNotify("Operation successful");
      return response.data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
      return null;
    }
  };

  const getCategories = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`${BASE_URL}categories`);
      dispatch(getSuccess({ data: data.data, url: 'categories' }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const getAds = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`${BASE_URL}ads`);
      dispatch(getSuccess({ data: data.data, url: 'ads' }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const getAdData = async (adId) => {
    try {
      const response = await axiosWithToken.get(`ads/${adId}`);
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch ad data", error);
      return null;
    }
  };

  const getKellerData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`${url}`);
      dispatch(getSuccess({ data: data.data, url }));
      return data.data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
    }
  };

  const getAddressData = async () => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.get('addresses/my-address');
      const data = response.data;
      dispatch(getSuccess({ data, url: 'addresses' }));
      return data;
    } catch (error) {
      dispatch(fetchFail());
      // toastErrorNotify(error?.response?.data?.message || "Operation not successful");
    }
  };

  const getMessageData = async () => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.get('messages/my-message');
      const data = response.data;
      dispatch(getSuccess({ data, url: 'messages' }));
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
      return null;
    }
  };

  const getUserData = async () => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.get('users/my-user');
      const data = response.data;
      dispatch(getSuccess({ data, url: 'users' }));
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
    }
  };

  const postKellerData = async (url, body) => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.post(`${url}`, body);
      const data = response.data;
      toastSuccessNotify("Operation successful");
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Operation failed");
    }
  };

  const postAdKellerData = async (url, body, config = {}) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${url}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...config.headers,
        },
        ...config,
      });
      toastSuccessNotify("Operation successful");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Operation not successful");
    }
  };

  const updateMessageReadStatus = async (threadId) => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.put(`messages/${threadId}/read-status`);
      const updatedThread = response.data;
      dispatch(getSuccess({ data: updatedThread, url: `messages/${threadId}` }));
      return updatedThread;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
      return null;
    }
  };
  

  const getFavoritesData = async (adId) => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.get('favorites/my-favorite', { params: { adId } });
      const data = response.data.data;  // Adjust based on actual API response structure
      dispatch(getSuccess({ data, url: 'favorites' }));
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
    }
  };


  const deleteFavoriteData = async (url, id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`${url}/${id}`);
      toastSuccessNotify("Operation success");
      
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
    }
  };


  const getFavoriteCount = async (adId) => {
    try {
      const response = await axios.get(`${BASE_URL}favorites/count/${adId}`);
      return response.data.count;
    } catch (error) {
      console.error("Failed to fetch favorite count", error);
      return 0;
    }
  };
  


  

  

  

  const putAdData = async (url, body, isFormData = false) => {
    dispatch(fetchStart());
    try {
      const config = isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};
      const response = await axiosWithToken.put(url, body, config);
      dispatch(getSuccess({ data: response.data, url }));
      toastSuccessNotify("Operation successful");
      return response.data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
      return null;
    }
  };

  const getFollowData = async (followedUserId) => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.get('follows/my-follow', { params: { followedUserId } });
      const data = response.data.data;  // Adjust based on actual API response structure
      dispatch(getSuccess({ data, url: 'follows' }));
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
    }
  };

  const deleteFollowData = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`follows/${id}`);
      toastSuccessNotify("Operation success");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error?.response?.data?.message || "Operation not successful");
    }
  };

  const getFollowCount = async (followedUserId) => {
    try {
      const response = await axiosWithToken.get(`follows/count/${followedUserId}`);
      return response.data.count;
    } catch (error) {
      console.error("Failed to fetch follow count", error);
      return 0;
    }
  };



  const getFollowers = async (followedUserId) => {
    try {
      const response = await axiosWithToken.get(`follows/findfollowers/${followedUserId}`);
      return response.data.followedUsers; // Ensure you return the correct data property
    } catch (error) {
      console.error("Failed to fetch followers", error);
      return [];
    }
  };
  


  const postFollowData = async (body) => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.post('follows', body);
      const data = response.data;
      toastSuccessNotify("Operation successful");
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Operation failed");
    }
  };

  const incrementViewCount = async (adId) => {
    console.log("Incrementing view count for ad:", adId);
    try {
      const response = await axiosWithToken.put(`ads/${adId}/increment-visitor`);
      console.log("View count incremented, response data:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Failed to increment view count", error);
      return null;
    }
  };
  
  const getAdsByCategory = async (categoryId) => {
    try {
      const { data } = await axios.get(`${BASE_URL}ads`);
      const filteredAds = data.data.filter(ad => ad.categoryId._id === categoryId);
      return filteredAds;
    } catch (error) {
      console.error("Failed to fetch ads by category", error);
      return [];
    }
  };
  

  const getAdsBySubCategory = async (subcategoryId) => {
    try {
      const { data } = await axios.get(`${BASE_URL}ads`);
      const filteredAds = data.data.filter(ad => ad.subcategoryId._id === subcategoryId);
      return filteredAds;
    } catch (error) {
      console.error("Failed to fetch ads by subcategory", error);
      return [];
    }
  };
  


  const deleteConversation = async (conversationId) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`messages/${conversationId}`);
      toastSuccessNotify("Conversation deleted successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Failed to delete conversation");
    }
  };


  const getAdsByRadius = async (PLZ, radius) => {
    const response = await axios.get(`${BASE_URL}ads/by-radius`, {
      params: { PLZ, radius }
    });
    return response.data;
  };


  const getLatestAds = async (limit = 10) => {
    const { data } = await axios.get(`${BASE_URL}ads/latest?limit=${limit}`);
    return data.data;
  };
  
  const getPopularAds = async (limit = 10) => {
    const { data } = await axios.get(`${BASE_URL}ads/popular?limit=${limit}`);
    return data.data;
  };
  
  const getMostViewedAds = async (limit = 10) => {
    const { data } = await axios.get(`${BASE_URL}ads/most-viewed?limit=${limit}`);
    return data.data;
  };
  


  const searchAds = async (searchQuery) => {
    try {
      const response = await axios.get(`${BASE_URL}ads/search`, {
        params: { query: searchQuery },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching ads:", error);
      throw error;
    }
  };



  return {
    getCategories,
    getKellerData,
    deleteKellerData,
    postKellerData,
    postAdKellerData,
    putKellerData,
    getAddressData,
    getUserData,
    putUserData,
    getMessageData,
    getAds,
    getAdData,
    updateMessageReadStatus,
    getFavoritesData,
    deleteFavoriteData,
    getFavoriteCount,
    getFollowData,
    deleteFollowData,
    getFollowCount,
    postFollowData,
    putAdData,
    getFollowers,
    incrementViewCount,
    getAdsByCategory,
    getAdsBySubCategory,
    deleteConversation,
    getAdsByRadius,
    getLatestAds,
    getPopularAds,
    getMostViewedAds,
    searchAds  
  
  }
};

export default useKellerCall;
