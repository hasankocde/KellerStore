import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommonCard from "../cards/CommonCard";
import useKellerCall from "../../hooks/useKellerCall";
import Banner from "../../components/Banner";
import ProfileSidebar from "../../components/ProfileSidebar";
import '../../index.css';

const WishListContainer = () => {
  const title = `Merkliste`;
  const [favorites, setFavorites] = useState([]);
  
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log(currentUser);

  const { getKellerData } = useKellerCall();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchFavoriteAds = async () => {
      try {
        const favoriteAds = await getKellerData('favorites');
        console.log("Favorite Ads:", favoriteAds);

        // Check if favoriteAds is an array
        if (!Array.isArray(favoriteAds)) {
          throw new Error("favoriteAds is not an array");
        }

        const userFavorites = favoriteAds.filter(favorite => 
          favorite.userId && favorite.userId._id && favorite.userId._id === currentUser
        );
        console.log("User Favorites:", userFavorites);

        const adsData = await Promise.all(
          userFavorites.map(async (fav) => {
            // Check if fav.adId is defined and has _id
            if (!fav.adId || !fav.adId._id) {
              console.error("Invalid favorite ad structure", fav);
              return null;
            }
            const ad = await getKellerData(`ads/${fav.adId._id}`);
            return ad;
          })
        );

        // Filter out any null values from adsData
        const validAdsData = adsData.filter(ad => ad !== null);
        console.log("Ads Data:", validAdsData);
        setFavorites(validAdsData);
      } catch (error) {
        console.error("Failed to fetch favorite ads", error);
      }
    };

    if (currentUser) {
      fetchFavoriteAds();
    }
  }, [currentUser]);

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
            <h1 className="text-3xl ps-5 pt-5">meine Favoriten</h1>
          </div>
          <div className="grid mx-7 my-2">
            {favorites.map((ad) => (
              <CommonCard key={ad._id} ad={ad} baseUrl={baseUrl} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishListContainer;
