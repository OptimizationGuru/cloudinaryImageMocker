import React from 'react';
import HomePage from './components/Homepage/index';
import NewThumbnails from './components/NewlyAddedThumbNail';

const App: React.FC = () => {
  return (
    <div className="bg-gray-200 w-screen h-full flex flex-col items-center gap-4">
      <div className="w-full max-w-screen py-4 flex flex-col items-center justify-center gap-4 border-b border-black">
        <HomePage />
      </div>

      <div className="w-full h-auto max-w-4xl -mt-24 md:-mt-48 px-4 flex flex-col items-center justify-center gap-4">
        <NewThumbnails />
      </div>
    </div>
  );
};

export default App;
