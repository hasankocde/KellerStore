import React, { useEffect, useState } from 'react';
import useKellerCall from '../../hooks/useKellerCall';
import DeleteModal from './DeleteModal'; // Modal'ı import edin

const FollowsList = () => {
  const { getKellerData, deleteKellerData } = useKellerCall();
  const [follows, setFollows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal durumu
  const [selectedFollowId, setSelectedFollowId] = useState(null); // Silinecek takibin ID'si

  useEffect(() => {
    const fetchFollows = async () => {
      const data = await getKellerData('/follows');
      setFollows(data);
    };

    fetchFollows();
  }, []);

  const handleDelete = (followId) => {
    // Modal'ı açın ve silinecek takibin ID'sini ayarlayın
    setSelectedFollowId(followId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    // Takibi silin ve modal'ı kapatın
    await deleteKellerData('/follows', selectedFollowId);
    setFollows(follows.filter(follow => follow._id !== selectedFollowId));
    setShowDeleteModal(false);
  };

  return (
    <div className="follows-list">
      <h2 className="text-3xl ps-5 pt-5">Follows</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {follows.map(follow => (
            <tr key={follow._id}>
              <td>{follow.username}</td>
              <td>
                <button className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange" onClick={() => handleDelete(follow._id)}>Löschen</button>
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

export default FollowsList;
