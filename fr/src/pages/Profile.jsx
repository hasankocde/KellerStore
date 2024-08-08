import React, { useState } from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import AdminSidebar from "../components/AdminSideBar";
import ProfileContainer from "../components/container/ProfileContainer";
import AdminDashboard from "../pages/AdminDashboard";
import Banner from "../components/Banner";

const Profile = () => {
  const [isAdminView, setIsAdminView] = useState(false);
  const [currentAdminView, setCurrentAdminView] = useState('');
  const title = `PROFILE`;

  return (
    <>
      <div>
        <Banner title={title} target={"/allad"} />
      </div>
      <div className="flex">
        <div>
          {isAdminView ? (
            <AdminSidebar setIsAdminView={setIsAdminView} setCurrentView={setCurrentAdminView} />
          ) : (
            <ProfileSidebar setIsAdminView={setIsAdminView} />
          )}
        </div>
        <div className="flex-grow">
          {isAdminView ? <AdminDashboard currentView={currentAdminView} /> : <ProfileContainer />}
        </div>
      </div>
    </>
  );
};

export default Profile;
