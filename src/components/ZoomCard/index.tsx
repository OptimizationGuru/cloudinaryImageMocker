import React, { useEffect, useState } from 'react';
import { Card } from '../Card/index';
import useFetchImages from '../../hooks/useFetchImageByPosition';
import Spinnerr from '../Spinner';
import { ThumbnailData } from '../../hooks/useFetchThumbnails';

interface ZoomedCardProps {
  cardProps: {
    publicId: string;
    width: number;
    height: number;
    alt?: string;
    title: string;
    onClick?: () => void;
  };
  position: number;
  searchKey: string;
  onClose: () => void;
}

const ZoomedCard: React.FC<ZoomedCardProps> = ({
  cardProps,
  position,
  searchKey,
  onClose,
}) => {
  const { images, loading } = useFetchImages({ position, searchKey });

  const [imageData, setImageData] = useState<ThumbnailData | null>(null);

  useEffect(() => {
    if (images && images.length > 0) {
      setImageData(images[0]);
      cardProps.publicId = images[0]?.publicId;
    }
  }, [images, cardProps]);

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

  if (loading || !imageData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
        <Spinnerr isSaving={false} />
      </div>
    );
  }

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
