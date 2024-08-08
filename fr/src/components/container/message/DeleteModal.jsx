import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg">
        <h2 className="text-xl mb-4">Sind Sie sicher, dass Sie diese Konversation löschen möchten?</h2>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Absagen</button>
          <button onClick={onConfirm} className="bg-red-500 text-white p-2 rounded">Löschen</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
