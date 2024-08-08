import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CommonCard from "../components/cards/CommonCard";
import useKellerCall from "../hooks/useKellerCall";

const baseUrl = import.meta.env.VITE_BASE_URL;

const CombinedSearchPage = () => {
  const location = useLocation();
  const { searchQuery, PLZ, radius } = location.state || {};
  const { getAdsByRadius, searchAds } = useKellerCall();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        let results = [];
        if (searchQuery) {
          const searchResults = await searchAds(searchQuery);
          results = searchResults.data;
        }
        if (PLZ && radius !== "Ganzer Ort") {
          const locationResults = await getAdsByRadius(PLZ, radius);
          results = searchQuery 
            ? results.filter(ad => locationResults.data.some(locAd => locAd._id === ad._id))
            : locationResults.data;
        }
        setAds(results);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, [searchQuery, PLZ, radius]);

  return (
    <div className="category-page-container">
      <div className="category-header">
        <div className="selected-category flex items-center justify-center mt-5">
          <span className="text-2xl font-bold">
            Ergebnisse für {searchQuery ? `"${searchQuery}"` : ''} 
            {PLZ ? ` in ${PLZ}` : ''} 
            {radius !== "Ganzer Ort" ? ` within ${radius} km` : ''}
          </span>
        </div>
      </div>
      <div className="ads-grid-container mx-auto mt-4" style={{ padding: '0 2cm 1cm' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {ads.length > 0 ? (
            ads.map((ad) => (
              <CommonCard key={ad._id} ad={ad} baseUrl={baseUrl} />
            ))
          ) : (
            <p>Für diese Suchkriterien wurden keine Anzeigen gefunden.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CombinedSearchPage;
