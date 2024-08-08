import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CommonCard from "../components/cards/CommonCard";
import useKellerCall from "../hooks/useKellerCall";
import '../index.css';

const baseUrl = import.meta.env.VITE_BASE_URL;

const LocationSearchPage = () => {
  const location = useLocation();
  const { PLZ, radius } = location.state || {};
  const { getAdsByRadius } = useKellerCall();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const result = await getAdsByRadius(PLZ, radius);
        setAds(result.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    if (PLZ && radius) {
      fetchAds();
    }
  }, [PLZ, radius]);

  return (
    <div className="category-page-container">
      <div className="category-header">
        <div className="selected-category flex items-center justify-center mt-5">
          <span className="text-2xl font-bold">Ergebnisse für{PLZ} within {radius} km</span>
        </div>
      </div>
      <div className="ads-grid-container mx-auto mt-4" style={{ padding: '0 2cm 1cm' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {ads.length > 0 ? (
            ads.map((ad) => (
              <CommonCard key={ad._id} ad={ad} baseUrl={baseUrl} />
            ))
          ) : (
            <p>No ads found for this location and radius.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSearchPage;
