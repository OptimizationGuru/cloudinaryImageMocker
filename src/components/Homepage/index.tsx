import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card } from '../Card';
import ZoomedCard from '../ZoomCard';
import { reorder } from '../../utils/dragAndDropHelper';
import data from '../../data/thumbnails.json';
import { thumbnailHeight, thumbnailWidth } from '../../constants';
import updateDimensions from '../../utils/updateImageDimensions';

const HomePage: React.FC = () => {
  const [documents, setDocuments] = useState(data);
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
          onClose={() => setSelectedImage(null)}
          position={selectedImage}
        />
      )}
    </div>
  );
};

export default HomePage;
