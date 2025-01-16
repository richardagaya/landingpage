import React, { useState, useCallback, memo } from "react";
import { useRouter } from "next/router";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const ItemType = {
  NAME: "name",
};

interface DraggableItemProps {
  index: number;
  name: string;
  imageUrl: string;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableItem = memo(({ index, name, imageUrl, moveItem }: DraggableItemProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemType.NAME,
    hover(item: { type: string; index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.NAME,
    item: { name, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center space-x-3 bg-gray-700 p-3 rounded-md cursor-move shadow-lg transition-opacity duration-200 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <img src={imageUrl} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <span className="text-white font-medium text-base">{name}</span>
    </div>
  );
});

// Set display name for the memoized component
DraggableItem.displayName = "DraggableItem";

const QuizPage = () => {
  const router = useRouter();
  const [names, setNames] = useState([
    { name: "Ecommerce", imageUrl: "/Ecommerce.png" },
    { name: "Sales", imageUrl: "/sales.png" },
    { name: "Content Creation", imageUrl: "/Content Creation.png" },
    { name: "Programming", imageUrl: "/Software Development.png" },
    { name: "Trading", imageUrl: "/Trading.png" },
  ]);

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setNames((prevNames) =>
      update(prevNames, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevNames[dragIndex]],
        ],
      })
    );
  }, []);

  const navigateToNextQuestion = () => {
    router.push("/Skillstest");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white" style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: "center center" }}>
        <div className="w-full max-w-6xl p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-lg md:text-xl font-semibold text-yellow-300 mb-4">
          Which industry would you be most excited to gain skill in?
          </h1>
          <div className="space-y-4">
            {names.map((person, index) => (
              <DraggableItem
                key={person.name}
                index={index}
                name={person.name}
                imageUrl={person.imageUrl}
                moveItem={moveItem}
              />
            ))}
          </div>
        </div>

        <button
          onClick={navigateToNextQuestion}
          className="mt-8 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition"
        >
          Next
        </button>
      </div>
    </DndProvider>
  );
};

export default QuizPage;
