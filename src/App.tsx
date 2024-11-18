import React from 'react';
import HomePage from './components/Homepage/index';
import NewThumbnails from './components/NewlyAddedThumbNail';

const App: React.FC = () => {
  return (
    <div className="bg-gray-200 w-full min-h-screen flex flex-col items-center gap-4">
      <div className="w-full max-w-screen py-4 flex flex-col items-center justify-center gap-4 border-b border-black sm:mb-24">
        <HomePage />
      </div>

      <div className="w-full max-w-4xl px-4 flex flex-col items-center justify-center gap-4 mt-8 md:mt-24">
        <NewThumbnails />
      </div>
    </div>
  );
};

export default App;
