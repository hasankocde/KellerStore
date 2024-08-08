import React, { useEffect, useState } from 'react';
import useKellerCall from '../../hooks/useKellerCall';
import '../../index.css'; 
import DeleteModal from './DeleteModal'; // Modal'ı import edin

const AddressesList = () => {
  const { getKellerData, deleteKellerData } = useKellerCall();
  const [addresses, setAddresses] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal durumu
  const [selectedAddressId, setSelectedAddressId] = useState(null); // Silinecek adresin ID'si

  useEffect(() => {
    const fetchAddresses = async () => {
      const data = await getKellerData('/addresses');
      setAddresses(data);
    };

    fetchAddresses();
  }, []);

  const handleDelete = (addressId) => {
    // Modal'ı açın ve silinecek adresin ID'sini ayarlayın
    setSelectedAddressId(addressId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    // Adresi silin ve modal'ı kapatın
    await deleteKellerData('/addresses', selectedAddressId);
    setAddresses(addresses.filter(address => address._id !== selectedAddressId));
    setShowDeleteModal(false);
  };

  return (
    <div className="addresses-list">
      <h2 className="text-3xl ps-5 pt-5">Addresses</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Street</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map(address => (
            <tr key={address._id}>
              <td>{address.street}</td>
              <td>{address.city}</td>
              <td>
                <button className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange" onClick={() => handleDelete(address._id)}>Löschen</button>
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

export default AddressesList;
