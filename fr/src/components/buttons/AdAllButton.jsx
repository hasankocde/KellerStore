import React from "react";
import { useNavigate } from "react-router-dom";

const AdAllButton = ({ target }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(target);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="btnAllAd bg-white border border-0.5 border-button-blue hover:bg-button-blue hover:text-white flex items-center w-"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        Alle Anzeigen
      </button>
    </div>
  );
};

export default AdAllButton;
