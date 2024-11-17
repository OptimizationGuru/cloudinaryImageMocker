import React from 'react';

export const Spinnerr: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
    </div>
  );
};

export default Spinnerr;
