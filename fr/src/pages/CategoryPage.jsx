import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CommonCard from "../components/cards/CommonCard";
import useKellerCall from "../hooks/useKellerCall";
import icons from "../icons"; // Import icons
import '../index.css';
const baseUrl = import.meta.env.VITE_BASE_URL;

const CategoryPage = () => {
  const location = useLocation();
  const { category } = location.state || {};
  const selectedCategory = category || {};
  const { getAdsByCategory } = useKellerCall();
  const [categoryAds, setCategoryAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 8;

  useEffect(() => {
    console.log("Selected Category:", selectedCategory); // Debugging statement
    const fetchAds = async () => {
      if (selectedCategory._id) {
        try {
          const ads = await getAdsByCategory(selectedCategory._id);
          console.log("Fetched Ads:", ads); // Debugging statement
          setCategoryAds(ads);
        } catch (error) {
          console.error("Error fetching ads:", error);
        }
      }
    };

    fetchAds();
  }, [selectedCategory]);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = categoryAds.slice(indexOfFirstAd, indexOfLastAd);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="category-page-container">
      <div className="category-header">
        {selectedCategory && (
          <div className="selected-category flex items-center justify-center mt-5">
            <img
              src={icons[selectedCategory.categoryName]} 
              alt={selectedCategory.categoryName}
              className="category-icon w-34 h-34 mr-2" // Adjusted size
            />
            <span className="text-2xl font-bold">{selectedCategory.categoryName}</span>
          </div>
        )}
      </div>
      <div className="ads-grid-container mx-auto mt-4" style={{ padding: '0 2cm 1cm' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {currentAds.length > 0 ? (
            currentAds.map((ad) => (
              <CommonCard key={ad._id} ad={ad} baseUrl={baseUrl} />
            ))
          ) : (
            <p>Für diese Kategorie wurden keine Anzeigen gefunden.</p>
          )}
        </div>
      </div>
      <div className="pagination flex justify-center mt-5">
        {[...Array(Math.ceil(categoryAds.length / adsPerPage)).keys()].map(number => (
          <button key={number} onClick={() => paginate(number + 1)} className="px-3 py-1 mx-1 border rounded">
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
