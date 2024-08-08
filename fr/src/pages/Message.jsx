import React, { useState } from 'react';
import ProfileSidebar from '../components/ProfileSidebar';
import MessageContainer from '../components/container/MessageContainer';
import Banner from '../components/Banner';

const Message = () => {
  const title = 'NACHRICHT';
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const onMessageCountUpdate = () => {
    // Your logic for updating message count
    console.log('Message count updated');
  };

  return (
    <>
      <div>
        <Banner title={title} target="/allad" />
      </div>
      <div className="flex">
        <div>
          <ProfileSidebar />
        </div>
        <div className="flex-grow">
          <MessageContainer handleRefresh={handleRefresh} onMessageCountUpdate={onMessageCountUpdate} />
        </div>
      </div>
    </>
  );
};

export default Message;
