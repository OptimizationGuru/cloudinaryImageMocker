import React, { useState, useEffect } from 'react';
import { Card } from '../Card';
import ZoomedCard from '../ZoomCard';
import { thumbnailHeight, thumbnailWidth } from '../../constants';
import updateDimensions from '../../utils/updateImageDimensions';
import Spinnerr from '../Spinner';
import useFetchNewlyAddedThumbnails from '../../hooks/useFetchNewlyAddedThumbnails';

interface NewThumbnailsProps {
  refresh: number;
}

const NewThumbnails: React.FC<NewThumbnailsProps> = ({ refresh }) => {
  const { images, loading } = useFetchNewlyAddedThumbnails();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [allImages, setAllImages] = useState(images);

  const [selectedCardTitle, setSelectedCardTitle] = useState<string | null>(
    null
  );
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const { width, height } = updateDimensions();
    setDimensions({ width, height });
    window.addEventListener('resize', updateDimensions);
    setAllImages(images);

    return () => window.removeEventListener('resize', updateDimensions);
  }, [images]);

  const setCardData = ({
    position,
    title,
  }: {
    position: number;
    title: string;
  }) => {
    setSelectedImage(position);
    setSelectedCardTitle(title);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
        <Spinnerr isSaving={true} />
      </div>
    );
  }

  return (
    images && (
      <div
        key={refresh}
        className="shadow-xl w-screen h-auto min-h-screen  flex flex-col items-center justify-center"
      >
        <div className="text-xl text-white rounded-lg bg-transparent bg-gradient-to-r from-blue-700 to-red-500 px-4 py-2">
          Newly Added
        </div>
        <div className="flex flex-wrap gap-4 justify-center my-12">
          {allImages.map((doc) => (
            <div
              key={doc?.type}
              className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={() => setCardData(doc)}
            >
              <Card
                title={doc?.title}
                publicId={doc?.publicId}
                width={thumbnailWidth}
                height={thumbnailHeight}
                alt={'thumbnail'}
                onClick={() => {
                  setSelectedImage(doc?.position);
                }}
              />
            </div>
          ))}
        </div>

        {selectedImage && (
          <ZoomedCard
            cardProps={{
              publicId: String(selectedImage),
              width: dimensions.width,
              height: dimensions.height,
              alt: selectedCardTitle || '',
              title: selectedCardTitle || '',
            }}
            onClose={() => setSelectedImage(null)}
            position={selectedImage}
          />
        )}
      </div>
    )
  );
};

export default NewThumbnails;
