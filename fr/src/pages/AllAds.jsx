import React from "react";
import Banner from "../components/Banner";
import CategoryIconCard from "../components/cards/CategoryIconCard";
import SideBar from "../components/SideBar";
import AdCard from "../components/cards/AdCard";

const AllAds = () => {
  const title = `Alle Anzeigen`;

  return (
    <div>
      <div className=" ">
        <Banner title={title} target={"/allad"} />
        <div>
          <CategoryIconCard />
        </div>
      </div>
      <div className="flex ">
        <div className=" ">
          <SideBar />
        </div>
        <div className="flex-grow">
          <AdCard />
        </div>
      </div>
    </div>
  );
};

export default AllAds;
