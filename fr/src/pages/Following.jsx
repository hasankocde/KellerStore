import React from "react";


import FollowingContainer from "../components/container/FollowingContainer";


const Following = () => {
  const title = `FOLGEN`;

  return (
    <>
      
      <div className="flex">
        

        <div className="flex-grow">
          <FollowingContainer />
        </div>
      </div>
    </>
  );
};

export default Following;
