import React, { useState, memo } from 'react';
import { useRouter } from 'next/router';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DraggableItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const DraggableItem = memo(({ id, name, imageUrl }: DraggableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    padding: '12px',
    margin: '4px 0', // increased spacing for touch accessibility
    boxShadow: isDragging ? '0 5px 15px rgba(0,0,0,0.25)' : 'none',
    background: isDragging ? '#333' : '#444', // visual feedback for dragging
    transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}
         className="flex items-center space-x-3 rounded-md cursor-move">
      <img src={imageUrl} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <span className="text-white font-medium text-lg">{name}</span>
    </div>
  );
});
DraggableItem.displayName = 'DraggableItem';

const QuizPage = () => {
  const router = useRouter();
  const [names, setNames] = useState([
    { id: 'Tony Robins', name: 'Tony Robins', imageUrl: '/Tony Robins.png' },
    { id: 'Jeff Bezos', name: 'Jeff Bezos', imageUrl: '/Jeff Bezos.png' },
    { id: 'Mr.Beast', name: 'Mr.Beast', imageUrl: '/Mr Beast.png' },
    { id: 'Elon Musk', name: 'Elon Musk', imageUrl: '/Elon Musk.png' },
    { id: 'Warren Buffet', name: 'Warren Buffet', imageUrl: '/Warren Buffet.png' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Adjust distance for better touch device interaction
      }
    })
  );

  const handleDragEnd = (event: { active: any; over: any; }) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setNames((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={names.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900"
             style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: "center center" }}>
          <div className="w-full max-w-4xl p-5 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold text-yellow-300 mb-4">
            Who's Success Story Inspires You The Most?
            </h1>
            <div className="space-y-4">
              {names.map(person => (
                <DraggableItem key={person.id} id={person.id} name={person.name} imageUrl={person.imageUrl} />
              ))}
            </div>
          </div>

          <button
            onClick={() => router.push("/Ques2")}
            className="mt-10 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Next
          </button>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default QuizPage;
