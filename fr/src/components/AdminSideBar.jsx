import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminButtons = [
  { name: 'User List', view: 'users' },
  { name: 'Ad List', view: 'ads' },
  { name: 'Category List', view: 'categories' },
  { name: 'Messages List', view: 'messages' },
  { name: 'Addresses List', view: 'addresses' },
  { name: 'Favorites List', view: 'favorites' },
  { name: 'Follows List', view: 'follows' },
];

const AdminSidebar = ({ setIsAdminView, setCurrentView }) => {
  const navigate = useNavigate();

  const handleClick = (view) => {
    setCurrentView(view);
    setIsAdminView(true);
  };

  return (
    <nav className="bg-background-filter-light-blue space-y-2 sm:w-80 py-3 ms-3 mt-5 rounded-lg">
      <div className="text-center">
        <button onClick={() => setIsAdminView(false)} className="btnProfile mt-1 w-60">
          Back to Profile
        </button>
      </div>
      {AdminButtons.map((x) => (
        <div className="text-center" key={x.name}>
          <button onClick={() => handleClick(x.view)} className="btnProfile mt-1 w-60">
            {x.name}
          </button>
        </div>
      ))}
    </nav>
  );
};

export default AdminSidebar;
