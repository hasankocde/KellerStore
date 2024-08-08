import React from "react";

const BackButton = () => {
  return (
    <div>
      <button
        style={{ padding: "0.5rem 1.5rem" }}
        className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange"
      >
        Zurück
      </button>
    </div>
  );
};

export default BackButton;
