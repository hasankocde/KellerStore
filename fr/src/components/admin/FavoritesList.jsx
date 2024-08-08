import React, { useEffect, useState } from 'react';
import useKellerCall from '../../hooks/useKellerCall';
import DeleteModal from './DeleteModal'; // Modal'ı import edin

const FavoritesList = () => {
  const { getKellerData, deleteKellerData } = useKellerCall();
  const [favorites, setFavorites] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal durumu
  const [selectedFavoriteId, setSelectedFavoriteId] = useState(null); // Silinecek favorinin ID'si

  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await getKellerData('/favorites');
      setFavorites(data);
    };

    fetchFavorites();
  }, []);

  const handleDelete = (favoriteId) => {
    // Modal'ı açın ve silinecek favorinin ID'sini ayarlayın
    setSelectedFavoriteId(favoriteId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    // Favoriyi silin ve modal'ı kapatın
    await deleteKellerData('/favorites', selectedFavoriteId);
    setFavorites(favorites.filter(favorite => favorite._id !== selectedFavoriteId));
    setShowDeleteModal(false);
  };

  return (
    <div className="favorites-list">
      <h2 className="text-3xl ps-5 pt-5">Favorites</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map(favorite => (
            <tr key={favorite._id}>
              <td>{favorite.title}</td>
              <td>{favorite.description}</td>
              <td>
                <button className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange" onClick={() => handleDelete(favorite._id)}>Löschen</button>
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

export default FavoritesList;
