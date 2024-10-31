import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import APISettingsModal from './APISettingsModal';

const SettingsButton = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowSettings(true)}
        className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
      >
        <Settings className="h-5 w-5" />
      </button>

      {showSettings && <APISettingsModal onClose={() => setShowSettings(false)} />}
    </>
  );
};

export default SettingsButton;