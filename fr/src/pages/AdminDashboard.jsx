import React from 'react';
import UserList from '../components/admin/UserList';
import AdList from '../components/admin/AdList';
import CategoryList from '../components/admin/CategoryList';
import MessagesList from '../components/admin/MessagesList';
import AddressesList from '../components/admin/AddressesList';
import FavoritesList from '../components/admin/FavoritesList';
import FollowsList from '../components/admin/FollowsList';

const AdminDashboard = ({ currentView }) => {
  const renderView = () => {
    switch (currentView) {
      case 'users':
        return <UserList />;
      case 'ads':
        return <AdList />;
      case 'categories':
        return <CategoryList />;
      case 'messages':
        return <MessagesList />;
      case 'addresses':
        return <AddressesList />;
      case 'favorites':
        return <FavoritesList />;
      case 'follows':
        return <FollowsList />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard pl-3">
      {renderView()}
    </div>
  );
};

export default AdminDashboard;
