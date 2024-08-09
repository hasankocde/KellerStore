import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CommonCard from "../cards/CommonCard";
import '../../index.css';


const baseUrl = import.meta.env.VITE_BASE_URL;

const AdContainer = ({ title, ads = [] }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,  // Show 4 cards on large screens
      slidesToSlide: 4, // Optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,  // Show 2 cards on tablet screens
      slidesToSlide: 2, // Optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,  // Show 1 card on mobile screens
      slidesToSlide: 1, // Optional, default to 1.
    },
  };

  return (
    <div className="responsive-container m-auto bg-light-grey pb-7 mb-20 ad-container">
      <div className="flex justify-between items-center pt-3 pb-3">
        <h1 className="text-3xl ps-5">
          {title} <span className="text-button-blue">Anzeigen</span>
        </h1>
      </div>
      <Carousel
        responsive={responsive}
        ssr={true} // Means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={3000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-20-px" // Adjust padding class
      >
        {ads.map((ad, index) => (
          <div key={index} className="px-2">
            <CommonCard ad={ad} baseUrl={baseUrl} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AdContainer;
