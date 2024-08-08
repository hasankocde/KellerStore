import React from 'react';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

      <div className="modal-container bg-white w-1/2 mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Sind Sie sicher, dass Sie löschen möchten?</p>
            <button onClick={onClose} className="modal-close cursor-pointer z-50">
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">
          Diese Aktion kann nicht rückgängig gemacht werden.
          </p>
          <div className="flex justify-end pt-2">
            <button onClick={onClose} className="px-4 bg-transparent p-3 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 mr-2">
            Absagen
            </button>
            <button onClick={onDelete} className="modal-delete px-4 bg-button-blue p-3 rounded-lg text-sm font-medium text-white hover:bg-button-orange">
            Löschen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

