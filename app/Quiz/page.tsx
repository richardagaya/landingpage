"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const questions = [
  {
    questionText: "At work, I am convinced because of what I...",
    answers: [
      { id: "1", text: "See happening" },
      { id: "2", text: "Hear from others" },
      { id: "3", text: "Read in reports" },
      { id: "4", text: "Experience now" },
      { id: "5", text: "Do myself" },
    ],
  },
  {
    questionText: "I prioritize my tasks based on...",
    answers: [
      { id: "6", text: "Urgency" },
      { id: "7", text: "Importance" },
      { id: "8", text: "Duration" },
      { id: "9", text: "Resources required" },
      { id: "10", text: "Outcome" },
    ],
  },
  {
    questionText: "I prefer feedback that is...",
    answers: [
      { id: "11", text: "Detailed and frequent" },
      { id: "12", text: "Casual and infrequent" },
      { id: "13", text: "Positive" },
      { id: "14", text: "Constructive" },
      { id: "15", text: "Direct and straightforward" },
    ],
  },
  {
    questionText: "My ideal work environment involves...",
    answers: [
      { id: "16", text: "Collaboration" },
      { id: "17", text: "Independence" },
      { id: "18", text: "Flexibility" },
      { id: "19", text: "Structure" },
      { id: "20", text: "Innovation" },
    ],
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [items, setItems] = useState(questions[currentQuestion].answers);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over?.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const goToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setItems(questions[nextQuestion].answers);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-96 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Question {currentQuestion + 1}/4</h2>
        <p className="mb-4 text-gray-300">{questions[currentQuestion].questionText}</p>
        <p className="mb-4 text-sm text-gray-400">
          Place the questions in order of most like you to least like you.
        </p>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {items.map((item) => (
                <SortableItem key={item.id} id={item.id} text={item.text} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <button className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md" onClick={goToNextQuestion}>
          Next
        </button>
      </div>
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

export default Quiz;
