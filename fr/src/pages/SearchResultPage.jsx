import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CommonCard from "../components/cards/CommonCard";
import useKellerCall from "../hooks/useKellerCall";

const baseUrl = import.meta.env.VITE_BASE_URL;

const SearchResultPage = () => {
  const location = useLocation();
  const { searchQuery } = location.state || {};
  const { searchAds } = useKellerCall();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const result = await searchAds(searchQuery);
        setAds(result.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    if (searchQuery) {
      fetchAds();
    }
  }, [searchQuery]);

  return (
    <div className="category-page-container">
      <div className="category-header">
        <div className="selected-category flex items-center justify-center mt-5">
          <span className="text-2xl font-bold">Suchergebnisse für"{searchQuery}"</span>
        </div>
      </div>
      <div className="ads-grid-container mx-auto mt-4" style={{ padding: '0 2cm 1cm' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {ads.length > 0 ? (
            ads.map((ad) => (
              <CommonCard key={ad._id} ad={ad} baseUrl={baseUrl} />
            ))
          ) : (
            <p>No ads found for this search query.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
