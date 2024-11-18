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

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  let thumbnailsToAdd: ThumbnailData[] = [];
  let initialCount = 0;
  let clickCount = 0;
  const { images, loading } = useFetchThumbnails();

  const [documents, setDocuments] = useState<ThumbnailData[]>([]);
  const [thumbnails_, setThumbnails_] =
    useState<ThumbnailData[]>(newThumbnails);
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
    (thumbnails: any) => {
      for (let i = initialCount; i <= clickCount; i++) {
        thumbnailsToAdd.push(thumbnails[i]);
      }
      dispatch(addNewThumbnail(thumbnailsToAdd));
      initialCount = clickCount;
    },
    delay,
    { leading: false, trailing: true }
  );

  const handleClick = () => {
    ++clickCount;
    throttledAddThumbnail(thumbnails_);
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
    <div className="w-screen h-screen min-h-screen p-4">
      <button
        id="saveButton"
        type="button"
        className="text-white text-xl bg-transparent bg-gradient-to-r from-blue-700 to-red-500  focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg  px-5 py-2.5 text-center mx-auto block"
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
              className="grid gap-4 justify-center items-center h-[100%]"
            >
              {/* Row 1: 3 Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full my-12">
                {documents.slice(0, 3).map((doc, index) => (
                  <Draggable
                    key={doc.type}
                    draggableId={doc.type}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                        onClick={() => {
                          setCardData(doc);
                        }}
                      >
                        <Card
                          title={doc.title}
                          publicId={doc.publicId}
                          width={thumbnailWidth}
                          height={thumbnailHeight}
                          alt={'thumbnail'}
                          onClick={() => {
                            setSelectedImage(doc.position);
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>

              {/* Row 2: 2 Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full place-items-center">
                {documents.slice(3, 5).map((doc, index) => (
                  <Draggable
                    key={doc.type}
                    draggableId={doc.type}
                    index={index + 3}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                        onClick={() => {
                          setSelectedImage(doc.position);
                        }}
                      >
                        <Card
                          title={doc.title}
                          publicId={doc.publicId}
                          width={thumbnailWidth}
                          height={thumbnailHeight}
                          alt={'thumbnail'}
                          onClick={() => {
                            setSelectedImage(doc.position);
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
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
          searchKey={fullImages}
          position={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
