import React from "react";



import FollowersContainer from "../components/container/FollowersContainer.jsx";


const Followers = () => {
    const title = `FOLLOWERS`;

    return (
        <>

            <div className="flex">


                <div className="flex-grow">
                    <FollowersContainer />
                </div>
            </div>
        </>
    );
};

export default Followers;
