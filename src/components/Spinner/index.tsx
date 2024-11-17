import React, { useState, useEffect } from 'react';

type Props = {
  isSaving: boolean;
};

const Spinnerr: React.FC<Props> = ({ isSaving }) => {
  const [timeElapsed, setTimeElapsed] = useState<number>(5);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isSaving) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      setTimeElapsed(0); // Reset timer when not saving
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSaving]);

  return isSaving ? (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full mb-4"></div>
      <p className="text-white">Saving... {timeElapsed} seconds elapsed</p>
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
    </div>
  );
};

export default Spinnerr;
