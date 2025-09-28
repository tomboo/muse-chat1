import React, { useState } from 'react';

const DarkModeToggle: React.FC = () => {
  const [dark, setDark] = useState(false);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
    >
      {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
