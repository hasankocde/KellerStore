import React, { useEffect, useState } from 'react';
import useKellerCall from '../../hooks/useKellerCall';
import '../../index.css'; 
import DeleteModal from './DeleteModal'; // Modal'ı import edin

const UserList = () => {
  const { getKellerData, deleteKellerData } = useKellerCall();
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal durumu
  const [selectedUserId, setSelectedUserId] = useState(null); // Silinecek kullanıcının ID'si

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getKellerData('/users');
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    // Modal'ı açın ve silinecek kullanıcının ID'sini ayarlayın
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    // Kullanıcıyı silin ve modal'ı kapatın
    await deleteKellerData('/users', selectedUserId);
    setUsers(users.filter(user => user._id !== selectedUserId));
    setShowDeleteModal(false);
  };

  return (
    <div className="user-list">
      <h2 className="text-3xl ps-5 pt-5">Users</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Vorname Familienname</th>
            <th>Email</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange" onClick={() => handleDelete(user._id)}>Löschen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DeleteModal'ı render edin */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default UserList;

