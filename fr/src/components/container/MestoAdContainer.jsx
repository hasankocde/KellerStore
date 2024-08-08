import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommonCard from '../../components/cards/CommonCard';

const MestoAdContainer = ({ adDetails, selectedConversationId, selectedAd, handleBackClick }) => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Logging to debug selectedAd
  console.log("MestoAdContainer received selectedAd:", selectedAd);

  return (
    <div className="w-3/4 p-5">
      {selectedAd && (
        <div className="border w-full m-2 bg-light-grey pb-7 rounded-lg flex-grow main-content">
          <div className="flex justify-between items-center pt-3 pb-3">
            <h1 className="text-3xl ps-5 pt-5">Anzeigen</h1>
            <button
              type="button"
              className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange"
              onClick={handleBackClick}
            >
              Zurück
            </button>
          </div>
          <div className="grid mx-7 my-2">
            <CommonCard  ad={selectedAd} baseUrl={baseUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MestoAdContainer;
