import React, { useState } from 'react';
import HomePage from './components/Homepage/index';
import NewThumbnails from './components/NewlyAddedThumbNail';

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(1);

  const refreshPage = (childMessage: string) => {
    console.log(childMessage);
    setRefresh((prev) => ++prev);
  };

  return (
    <div className="bg-gray-200 w-screen min-h-screen flex flex-col items-center gap-4">
      <div className="w-full max-w-6xl py-4 flex flex-col items-center justify-center gap-4 border-b border-black">
        <HomePage notifyParent={refreshPage} />
      </div>

      <div className="w-full max-w-6xl flex flex-col items-center justify-center gap-4">
        <NewThumbnails refresh={refresh} />
      </div>
    </div>
  );
};

export default App;
