import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <button
        className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange"
        type="submit"
        onClick={handleClick}
      >
        Einloggen
      </button>
    </div>
  );
};

export default LoginButton;
