import React, { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useRouter } from "next/router";

const SortableItem = ({ id, text, imageUrl }: { id: string; text: string; imageUrl: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-700 p-3 rounded-md flex items-center space-x-3 shadow-lg"
    >
      <img
        src={imageUrl}
        alt={text}
        className="w-10 h-10 object-cover rounded-md"
      />
      <span className="text-white font-medium">{text}</span>
      <span className="text-gray-400 cursor-move ml-auto">⋮⋮</span>
    </div>
  );
};

const Question = ({
  questionText,
  answers,
  nextQuestion,
  isLastQuestion = false,
}: {
  questionText: string;
  answers: { id: string; text: string; imageUrl: string }[];
  nextQuestion?: string;
  isLastQuestion?: boolean;
}) => {
  const [items, setItems] = useState(answers);
  const router = useRouter();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      alert("Thank you for completing the quiz!");
    } else if (nextQuestion) {
      router.push(nextQuestion);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: 'url("/background.png")' }}
    >
      <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">{questionText}</h2>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {items.map((answer) => (
                <SortableItem
                  key={answer.id}
                  id={answer.id}
                  text={answer.text}
                  imageUrl={answer.imageUrl}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <button
          onClick={handleNext}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          {isLastQuestion ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Question;
