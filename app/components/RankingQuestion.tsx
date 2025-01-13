import React, { useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "../components/SortableItem";

const RankingQuestion = ({ question, onSubmit }) => {
  const [answers, setAnswers] = useState(question.answers);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setAnswers((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={answers} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2">
          {answers.map((answer) => (
            <SortableItem key={answer.id} id={answer.id}>
              {answer.text}
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
      <button
        onClick={() => onSubmit(answers)}
        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Next
      </button>
    </DndContext>
  );
};

export default RankingQuestion;
