import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileSidebar from "../components/ProfileSidebar";
import Banner from "../components/Banner";
import useKellerCall from "../hooks/useKellerCall";
import CommonCard from "../components/cards/CommonCard";

const MyAds = () => {
  const title = `Meine Anzeigen`;
  const { getKellerData } = useKellerCall();
  const [ads, setAds] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchAds = async () => {
      const adsData = await getKellerData('ads');
      const userAds = adsData.filter(ad => ad.ownerId._id === currentUser);
      console.log("userAds", userAds)
      setAds(userAds);
    };

    fetchAds();
  }, []);

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
            <h1 className="text-3xl ps-5 pt-5">Meine Anzeigen</h1>
          </div>
          <div className="grid mx-7 my-2">
          {ads.map((ad) => (
              <CommonCard key={ad._id} ad={ad} baseUrl={baseUrl} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAds;

