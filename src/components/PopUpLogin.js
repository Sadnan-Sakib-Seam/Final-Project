import React, { useState } from 'react';
import LoginModal from './LoginModal';

const PopUpLogin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>

      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default PopUpLogin;