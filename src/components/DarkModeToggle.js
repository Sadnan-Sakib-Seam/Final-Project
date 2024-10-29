import React, { useState, useEffect } from 'react';
import {SunIcon, MoonIcon} from '@heroicons/react/outline';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    document.body.classList.toggle('dark', savedMode);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', !isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
      <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
};

export default DarkModeToggle;