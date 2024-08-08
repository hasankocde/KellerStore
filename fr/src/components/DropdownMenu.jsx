import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useKellerCall from "../hooks/useKellerCall";

const DropdownMenu = () => {
  const { getCategories } = useKellerCall();
  const categories = useSelector((state) => state.keller.categories);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    getCategories();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    navigate('/category', { state: { category } });
    setIsOpen(false);
  };

  const handleSubCategoryClick = (subcategory, categoryName) => {
    navigate('/subcategory', { state: { subcategory, categoryName } });
    setIsOpen(false);
  };

  return (
    <div className="relative group inline-block">
      <button
        className="flex items-center btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange outline-none focus:outline-none px-3 py-1 rounded-sm"
        onClick={toggleDropdown}
      >
        <span className="mr-1 flex-1">Alle Kategorien</span>
        <span>
          <svg
            className="h-5 w-5 fill-current transform group-hover:-rotate-180 transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul
          className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32"
        >
          {categories.map((category) => (
            <li
              key={category._id}
              className="rounded-sm relative px-3 py-1 hover:bg-gray-100"
            >
              <button
                className="w-full text-left flex items-center outline-none focus:outline-none"
                onClick={() => handleCategoryClick(category)} // Add onClick handler for category
              >
                <span className="pr-1 flex-1">{category.categoryName}</span>
                <span className="mr-auto">
                  <svg
                    className="fill-current h-4 w-4 transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </span>
              </button>
              <ul
                className="bg-white border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32"
              >
                {/* Subcategories should be rendered here if available */}
                {category.subcategories && category.subcategories.map((sub) => (
                  <li
                    key={sub._id}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSubCategoryClick(sub, category.categoryName)} // Add onClick handler for subcategory
                  >
                    {sub.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
