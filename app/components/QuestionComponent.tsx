"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

type Answer = {
  id: string;
  text: string;
};

type QuestionComponentProps = {
  questionText: string;
  answers: Answer[];
  onComplete: (sortedAnswers: Answer[]) => void;
};

const QuestionComponent = ({ questionText, answers, onComplete }: QuestionComponentProps) => {
  const [sortedAnswers, setSortedAnswers] = useState<Answer[]>(answers);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setSortedAnswers((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over?.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleComplete = () => {
    onComplete(sortedAnswers);
  };

  return (
    <div className="w-96 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2 text-gold">Your Question</h2>
      <p className="mb-4 text-gray-300">{questionText}</p>
      <p className="mb-4 text-sm text-gray-400">
        Rank the options from most experienced (1) to least experienced (5).
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sortedAnswers.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {sortedAnswers.map((item) => (
              <SortableItem key={item.id} id={item.id} text={item.text} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button
        className="mt-4 w-full bg-gold hover:bg-yellow-500 text-darkblue py-2 rounded-md"
        onClick={handleComplete}
      >
        Submit
      </button>
    </div>
  );
};

const SortableItem = ({ id, text }: { id: string; text: string }) => {
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
      className="bg-gray-700 p-3 rounded-md flex justify-between items-center"
    >
      <span>{text}</span>
      <span className="text-gray-400 cursor-move">⋮⋮</span>
    </div>
  );
};

export default QuestionComponent;
