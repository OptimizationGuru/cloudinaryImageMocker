import React, { useEffect } from 'react';
import { Card } from '../Card/index';

interface ZoomedCardProps {
  cardProps: {
    publicId: string;
    width: number;
    height: number;
    alt: string;
    title: string;
    onClick?: () => void;
  };
  onClose: () => void;
}

const ZoomedCard: React.FC<ZoomedCardProps> = ({ cardProps, onClose }) => {
  useEffect(() => {
    const handleEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscPress);

    return () => {
      window.removeEventListener('keydown', handleEscPress);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 w-auto h-auto bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="w-auto h-full flex justify-center items-center p-4">
        <Card {...cardProps} width={1200} height={800} />
      </div>
    </div>
  );
};

export default ZoomedCard;
