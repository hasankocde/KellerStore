import React from "react";
import CommonCard from "../cards/CommonCard";
const baseUrl = import.meta.env.VITE_BASE_URL;

const AdCard = ({ ad }) => {
  return <CommonCard ad={ad} baseUrl={baseUrl} />;
};

export default AdCard;
