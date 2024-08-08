import React, { useEffect, useState } from 'react';
import useKellerCall from '../../hooks/useKellerCall';
import '../../index.css'; 
import DeleteModal from './DeleteModal'; // Modal'ı import edin

const CategoryList = () => {
  const { getKellerData, deleteKellerData, postKellerData } = useKellerCall();
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal durumu
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Silinecek kategorinin ID'si
  const [jsonInput, setJsonInput] = useState(''); // JSON input state

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getKellerData('/categories');
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleDelete = (categoryId) => {
    // Modal'ı açın ve silinecek kategorinin ID'sini ayarlayın
    setSelectedCategoryId(categoryId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    // Kategoriyi silin ve modal'ı kapatın
    await deleteKellerData('/categories', selectedCategoryId);
    setCategories(categories.filter(category => category._id !== selectedCategoryId));
    setShowDeleteModal(false);
  };

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      await postKellerData('/categories', parsedJson);
      const updatedCategories = await getKellerData('/categories');
      setCategories(updatedCategories);
      setJsonInput('');
    } catch (error) {
      console.error("Invalid JSON input", error);
    }
  };

  return (
    <div className="category-list">
      <h2 className="text-3xl ps-5 pt-5">Categories</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td>{category.categoryName}</td>
              <td>{category.description}</td>
              <td>
                <button className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange" onClick={() => handleDelete(category._id)}>Löschen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl ps-5 pt-5">Add New Categories</h2>
      <form onSubmit={handleSubmit} className="ps-5 pt-3">
        <div>
          <label>Categories JSON:</label>
          <textarea
            name="jsonInput"
            value={jsonInput}
            onChange={handleJsonInputChange}
            required
            className="ml-2 p-1 border w-full h-40"
          />
        </div>
        <button type="submit" className="mt-3 p-1 bg-green-500 text-white">Create Categories</button>
      </form>

      {/* DeleteModal'ı render edin */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default CategoryList;
