import React, { useState, useEffect } from 'react';
import { Card } from '../Card';
import ZoomedCard from '../ZoomCard';
import {
  newthumbnailImages,
  thumbnailHeight,
  thumbnailWidth,
} from '../../constants';
import updateDimensions from '../../utils/updateImageDimensions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/thumbnails';
import Spinnerr from '../Spinner';

const NewThumbnails: React.FC = () => {
  const { thumbnails, isLoading } = useSelector(
    (state: RootState) => state.thumbnail
  );

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [allImages, setAllImages] = useState([...thumbnails]); // Ensure immutability
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
    setAllImages([...thumbnails]); // Safely update state with immutability

    const handleResize = () => {
      const updatedDimensions = updateDimensions();
      setDimensions(updatedDimensions);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // Cleanup event listener
  }, [thumbnails]);

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

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
        <Spinnerr isSaving={true} />
      </div>
    );
  }
  return allImages.length ? (
    <div className="shadow-xl w-screen h-auto min-h-screen mt-2 flex flex-col items-center justify-center px-4">
      <div className="text-xl text-white rounded-lg bg-transparent bg-gradient-to-r from-blue-700 to-red-500 px-4 py-2">
        Newly Added Thumbnails
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
          position={selectedImage}
          searchKey={newthumbnailImages}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  ) : null;
};

export default NewThumbnails;
