import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from '../Card';
import ZoomedCard from '../ZoomCard';
import { reorder } from '../../utils/dragAndDropHelper';
import data from '../../data/document.json';

const HomePage: React.FC = () => {
  const [documents, setDocuments] = useState(data);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCardTitle, setSelectedCardTitle] = useState<null | string>(
    null
  );

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Function to update the image size based on window size
  const updateDimensions = () => {
    const screenWidth = window.innerWidth;
    let width = screenWidth * 0.8;
    let height = width * 0.75; // Maintain aspect ratio (3:4)

    if (width > 1200) width = 1200;
    if (height > 900) height = 900;

    setDimensions({ width, height });
  };

  useEffect(() => {
    updateDimensions();
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

  const setCardData = ({
    publicId,
    title,
  }: {
    publicId: string;
    title: string;
  }) => {
    setSelectedImage(publicId);
    setSelectedCardTitle(title);
  };

  const thumbnailWidth = 250;
  const thumbnailHeight = 250;

  return (
    <div className="w-screen h-screen min-h-screen border-black border-[4px] p-4">
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
                            setSelectedImage(doc.publicId);
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
                          setSelectedImage(doc.publicId);
                        }}
                      >
                        <Card
                          title={doc.title}
                          publicId={doc.publicId}
                          width={thumbnailWidth}
                          height={thumbnailHeight}
                          alt={'thumbnail'}
                          onClick={() => {
                            setSelectedImage(doc.publicId);
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
            publicId: selectedImage,
            width: dimensions.width,
            height: dimensions.height,
            alt: selectedCardTitle || '',
            title: selectedCardTitle || '',
          }}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
