import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CommonCard from "../components/cards/CommonCard";
import useKellerCall from "../hooks/useKellerCall";
import icons from "../icons"; // Import icons
import '../index.css';
const baseUrl = import.meta.env.VITE_BASE_URL;

const SubCategoryPage = () => {
  const location = useLocation();
  const { subcategory } = location.state || {};
  const selectedSubCategory = subcategory || {};
  const { getAdsBySubCategory } = useKellerCall();
  const [subCategoryAds, setSubCategoryAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 8;

  useEffect(() => {
    const fetchAds = async () => {
      if (selectedSubCategory._id) {
        try {
          const ads = await getAdsBySubCategory(selectedSubCategory._id);
          setSubCategoryAds(ads);
        } catch (error) {
          console.error("Error fetching ads:", error);
        }
      }
    };

    fetchAds();
  }, [selectedSubCategory]);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = subCategoryAds.slice(indexOfFirstAd, indexOfLastAd);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="subcategory-page-container">
      <div className="subcategory-header">
        {selectedSubCategory && (
          <div className="selected-subcategory flex items-center justify-center mt-5">
            {/* <img
              src={icons[selectedSubCategory.name]} 
              alt={selectedSubCategory.name}
              className="subcategory-icon w-44 h-44 mr-2" // Adjusted size
            /> */}
            <span className="text-3xl font-bold">{selectedSubCategory.name}</span>
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
            <p>Für diese Unterkategorie wurden keine Anzeigen gefunden.</p>
          )}
        </div>
      </div>
      <div className="pagination flex justify-center mt-5">
        {[...Array(Math.ceil(subCategoryAds.length / adsPerPage)).keys()].map(number => (
          <button key={number} onClick={() => paginate(number + 1)} className="px-3 py-1 mx-1 border rounded">
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryPage;
