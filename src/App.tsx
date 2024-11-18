import React from 'react';
import HomePage from './components/Homepage/index';
import NewThumbnails from './components/NewlyAddedThumbNail';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 w-screen min-h-screen flex flex-col items-center gap-4">
      <div className="w-screen max-w-screen py-4 flex flex-col items-center justify-center gap-4 border-b border-black sm:mb-24">
        <HomePage />
      </div>

      <div className="w-screen max-w-4xl px-4 flex flex-col items-center justify-center gap-4">
        <NewThumbnails />
      </div>
    </div>
  );
};

export default App;
