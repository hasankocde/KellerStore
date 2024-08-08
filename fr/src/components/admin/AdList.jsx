import React, { useEffect, useState } from 'react';
import useKellerCall from '../../hooks/useKellerCall';
import '../../index.css'; 
import DeleteModal from './DeleteModal'; // Modal'ı import edin

const AdList = () => {
  const { getKellerData, deleteKellerData } = useKellerCall();
  const [ads, setAds] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal durumu
  const [selectedAdId, setSelectedAdId] = useState(null); // Silinecek ilanın ID'si

  useEffect(() => {
    const fetchAds = async () => {
      const data = await getKellerData('/ads');
      setAds(data);
    };

    fetchAds();
  }, []);

  const handleDelete = async (adId) => {
    // Modal'ı açın ve silinecek ilanın ID'sini ayarlayın
    setSelectedAdId(adId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    // İlanı silin ve modal'ı kapatın
    await deleteKellerData('/ads', selectedAdId);
    setAds(ads.filter(ad => ad._id !== selectedAdId));
    setShowDeleteModal(false);
  };

  return (
    <div className="ad-list">
      <h2 className="text-3xl ps-5 pt-5">Ads</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ads.map(ad => (
            <tr key={ad._id}>
              <td>{ad.title}</td>
              <td>{ad.description}</td>
              <td>
                <button className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange" onClick={() => handleDelete(ad._id)}>Löschen</button>
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

export default AdList;
