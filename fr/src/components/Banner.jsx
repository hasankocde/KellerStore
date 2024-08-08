import React from "react";
import Image from "../assets/bannerImage.jpg";


const Banner = ({ title, desc, target }) => {
  return (
    <div className="mainDivBanner">
      <div className="bannerCloak"></div>
      {/* <div className="bannerImg"></div> */}
      <img src={Image} className="bannerImg" alt="bannerImage" />
      <div className="textTop mt-10 text-center text-white flex flex-col items-center w-2/4">
        <h2 className="text-2xl font-small"> {title} </h2>
        
        
      </div>
    </div>
  );
};

export default Banner;
