import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Car from "../../assets/automobile.png";
import Furniture from "../../assets/furniture.png";
import Electronics from "../../assets/electronics.png";
import Animals from "../../assets/animals.png";
import Fashion from "../../assets/fashion.png";
import Properties from "../../assets/properties.png";
import immobilien from "../../assets/immobilien.jpg";
import hobby from "../../assets/hobby.png";
import familiekind from "../../assets/familiekind.jpg";

import useKellerCall from "../../hooks/useKellerCall";
import { useSelector } from "react-redux";

import '../../index.css';

const icons = {
  "Elektronik": Electronics,
  "Fahrzeuge": Car,
  "Immobilien": immobilien,
  "Haushalt & Wohnen": Properties,
  "Mode & Accessoires": Fashion,
  "Hobby & Freizeit": hobby,
  "Tiermarkt": Animals,
  "Familie, Kind & Baby": familiekind,
  "Möbel": Furniture
};

const CategoryIconCard = () => {
  const { getCategories } = useKellerCall();
  const categories = useSelector((state) => state.keller.categories);

  useEffect(() => {
    getCategories();
  }, []);

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/category', { state: { category } });
  };

  const handleSubCategoryClick = (subcategory) => {
    navigate('/subcategory', { state: { subcategory } });
  };

  return (
    <section className="category-icon-container">
      <div className="overflow-visible flex flex-wrap justify-center gap-10 ">
        {categories.map((category) => (
          <div
            key={category._id}
            className="relative category-container cursor-pointer"
            style={{ overflow: 'visible' }}
            onClick={() => handleCategoryClick(category)} // Add onClick handler for category
          >
            <div
              className="border-2 rounded-xl w-44 h-44 bg-background-category-icon-blue p-5 flex flex-col justify-center items-center hover:border-button-blue active:translate-y-1"
            >
              <img src={icons[category.categoryName]} alt={category.categoryName} className="w-20 mx-auto mb-2" />
              <h4 className="text-gray-800 font-semibold">{category.categoryName}</h4>
            </div>
            <ul className="subcategory-list">
              {category.subcategories.map((sub) => (
                <li 
                  key={sub._id} 
                  className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering category click
                    handleSubCategoryClick(sub);
                  }}
                >
                  {sub.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryIconCard;
