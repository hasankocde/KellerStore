import React from "react";

import ProfileSidebar from "../components/ProfileSidebar";
import WishListContainer from "../components/container/WishListContainer";
import Banner from "../components/Banner";

const WishList = () => {
  const title = `MERKLISTE`;
  return (
    <>
      {/* <div>
        <Banner title={title} target={"/allad"} />
      </div> */}
      <div className="flex">
        {/* <div>
          <ProfileSidebar />
        </div> */}

        <div className="flex-grow">
          <WishListContainer />
        </div>
      </div>
    </>
  );
};

export default WishList;
