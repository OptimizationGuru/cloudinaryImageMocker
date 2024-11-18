import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card } from '../Card';
import ZoomedCard from '../ZoomCard';
import { reorder } from '../../utils/dragAndDropHelper';
import {
  delay,
  fullImages,
  thumbnailHeight,
  thumbnailWidth,
} from '../../constants';
import updateDimensions from '../../utils/updateImageDimensions';
import Spinnerr from '../Spinner';
import { throttle } from 'lodash';
import useFetchThumbnails, {
  ThumbnailData,
} from '../../hooks/useFetchThumbnails';
import { useDispatch } from 'react-redux';
import { addNewThumbnail } from '../../store/thumbnailSlice';
import { newThumbnails } from '../../data/newthumbnails';
import { AppDispatch } from '../../store/thumbnails';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  let initialCount = 0;
  let clickCount = 0;
  const { images, loading } = useFetchThumbnails();

  const [documents, setDocuments] = useState<ThumbnailData[]>([]);
  const [thumbnails_] = useState<ThumbnailData[]>(newThumbnails);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCardTitle, setSelectedCardTitle] = useState<null | string>(
    null
  );
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const { width, height } = updateDimensions();
    setDimensions({ width, height });
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedItems = reorder(
      documents,
      result.source.index,
      result.destination.index
    );
    setDocuments(reorderedItems);
  };

  const throttledAddThumbnail = throttle(
    async (thumbnails: ThumbnailData[], dispatch: AppDispatch) => {
      const thumbnailsToAdd: ThumbnailData[] = [];
      for (let i = initialCount; i < clickCount; i++) {
        thumbnailsToAdd.push(thumbnails[i]);
      }

      await dispatch(addNewThumbnail(thumbnailsToAdd));

      initialCount = clickCount;
    },
    delay,
    { leading: false, trailing: true }
  );

  const handleClick = () => {
    ++clickCount;
    throttledAddThumbnail(thumbnails_, dispatch);
  };

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

  useEffect(() => {
    setDocuments(images);
  }, [images]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
        <Spinnerr isSaving={true} />
      </div>
    );
  }

  return (
    <div className="w-screen h-auto p-4">
      <button
        id="saveButton"
        type="button"
        className="text-white my-8 text-xl bg-gradient-to-r from-blue-700 to-red-500 focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg px-5 py-2.5 text-center block mx-auto"
        onClick={handleClick}
      >
        Add Thumbnail
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="documents" direction="horizontal" type="group">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 mx-auto w-full"
            >
              {documents.map((doc, index) => (
                <Draggable key={doc.type} draggableId={doc.type} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex justify-center items-center p-1 shadow-md bg-gray-300 w-[250px] rounded-lg mx-auto"
                      onClick={() => setCardData(doc)}
                    >
                      <Card
                        title={doc.title}
                        publicId={doc.publicId}
                        width={thumbnailWidth}
                        height={thumbnailHeight}
                        alt="thumbnail"
                        className="w-full max-w-[400px] h-auto border rounded-md shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
          searchKey={fullImages}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
