import React from "react";

const DeleteConfirmationModal = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
      <div className="relative bg-gray-600 bg-opacity-50 w-full h-full">
        <div className="absolute top-1/3 right-1/4 bg-white p-5 rounded-lg shadow-lg pointer-events-auto">
          <h2 className="text-2xl mb-4">Sind Sie sicher, dass Sie löschen möchten?</h2>
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Absagen
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={onConfirm}
            >
              Genehmigen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
