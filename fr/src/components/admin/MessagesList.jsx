import React, { useEffect, useState } from 'react';
import useKellerCall from '../../hooks/useKellerCall';
import '../../index.css'; // Import the CSS file
import DeleteModal from './DeleteModal'; // Modal'ı import edin

const MessagesList = () => {
  const { getKellerData, deleteKellerData } = useKellerCall();
  const [messages, setMessages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal durumu
  const [selectedMessageId, setSelectedMessageId] = useState(null); // Silinecek mesajın ID'si

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getKellerData('/messages');
      setMessages(data);
    };

    fetchMessages();
  }, []);

  const handleDelete = (messageId) => {
    // Modal'ı açın ve silinecek mesajın ID'sini ayarlayın
    setSelectedMessageId(messageId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    // Mesajı silin ve modal'ı kapatın
    await deleteKellerData('/messages', selectedMessageId);
    setMessages(messages.filter(message => message._id !== selectedMessageId));
    setShowDeleteModal(false);
  };

  return (
    <div className="messages-list">
      <h2 className="text-3xl ps-5 pt-5">Messages</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Ad Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(message => (
            <tr key={message._id}>
              <td>{`${message.messages[0].senderId.firstName} ${message.messages[0].senderId.lastName}`}</td>
              <td>{message.adId.title}</td>
              <td>
                <button className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange" onClick={() => handleDelete(message._id)}>Löschen</button>
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

export default MessagesList;
