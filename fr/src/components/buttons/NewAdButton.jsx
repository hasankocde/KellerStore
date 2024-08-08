import React from "react";
import { useNavigate } from "react-router-dom";

const NewAdButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/newad");
  };

  return (
    <div>
      <button
        className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange"
        onClick={handleClick}
      >
        Anzeige Aufgeben
      </button>
    </div>
  );
};

export default NewAdButton;
