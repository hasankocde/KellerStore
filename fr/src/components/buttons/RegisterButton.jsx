import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div>
      {" "}
      <button
        className="btn bg-button-orange border border-0.5 border-button-orange hover:border-button-blue"
        onClick={handleClick}
      >
        Registrieren
      </button>
    </div>
  );
};

export default RegisterButton;
