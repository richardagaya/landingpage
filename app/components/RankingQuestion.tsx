// RankingQuestion.tsx
import React from "react";
import { DndContext, useSensor, PointerSensor, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem"; // Ensure this component is defined for rendering each draggable item

interface Answer {
  id: string;
  text: string;
}

interface Question {
  answers: Answer[];
}

interface RankingQuestionProps {
  question: Question;
  onSubmit: (answers: Answer[]) => void;
}

const RankingQuestion: React.FC<RankingQuestionProps> = ({ question, onSubmit }) => {
  const sensors = useSensor(PointerSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onSubmit(arrayMove(question.answers, question.answers.findIndex(item => item.id === active.id), question.answers.findIndex(item => item.id === over.id)));
    }
  };

  return (
    <DndContext sensors={[sensors]} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={question.answers} strategy={verticalListSortingStrategy}>
        {question.answers.map(answer => (
          <SortableItem key={answer.id} id={answer.id} text={answer.text} />
        ))}
      </SortableContext>
      <button onClick={() => onSubmit(question.answers)}>Submit Ranking</button>
    </DndContext>
  );
};

export default RankingQuestion;
