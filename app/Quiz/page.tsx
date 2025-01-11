"use client"
import React, { useState, useEffect } from "react";
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

type Answer = {
  id: string;
  text: string;
};

type Question = {
  questionText: string;
  type: "ranking" | "scoring";
  answers: Answer[];
};

const questions: Question[] = [
  {
    questionText: "Who's Success Story Inspires You The Most?",
    type: "scoring",
    answers: [
      { id: "1", text: "Jeff Bezos" },
      { id: "2", text: "Tony Robbins" },
      { id: "3", text: "Mr Beast" },
      { id: "4", text: "Elon Musk" },
      { id: "5", text: "Warren Buffett" },
    ],
  },
  {
    questionText:
      "It takes 1000 hours to gain financial freedom in any skill. Which of these industries do you have the most experience in?",
    type: "ranking",
    answers: [
      { id: "6", text: "Ecommerce" },
      { id: "7", text: "Sales" },
      { id: "8", text: "Content creation" },
      { id: "9", text: "Software development" },
      { id: "10", text: "Trading" },
    ],
  },
  {
    questionText:
      "It takes 1000 hours to gain financial freedom in any skill. Which of these industries do you have the most experience in?",
    type: "ranking",
    answers: [
      { id: "6", text: "Ecommerce" },
      { id: "7", text: "Sales" },
      { id: "8", text: "Content creation" },
      { id: "9", text: "Software development" },
      { id: "10", text: "Trading" },
    ],
  },
];

const AppQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<any[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const goToNextQuestion = (response: any) => {
    setResponses((prev) => [...prev, response]);
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      console.log("Quiz completed. Responses:", responses);
      alert("Quiz Completed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-96 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-gold">
          Question {currentQuestionIndex + 1}/{questions.length}
        </h2>
        <p className="mb-4 text-gray-300">{currentQuestion.questionText}</p>
        {currentQuestion.type === "ranking" ? (
          <RankingQuestion
            question={currentQuestion}
            onSubmit={(response) => goToNextQuestion({ question: currentQuestion, response })}
          />
        ) : (
          <ScoringQuestion
            question={currentQuestion}
            onSubmit={(response) => goToNextQuestion({ question: currentQuestion, response })}
          />
        )}
      </div>
    </div>
  );
};

const RankingQuestion = ({
  question,
  onSubmit,
}: {
  question: Question;
  onSubmit: (response: Answer[]) => void;
}) => {
  const [answers, setAnswers] = useState<Answer[]>(question.answers);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setAnswers((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over?.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={answers.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {answers.map((item) => (
              <SortableItem key={item.id} id={item.id} text={item.text} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button
        className="mt-4 w-full bg-gold hover:bg-yellow-500 text-darkblue py-2 rounded-md"
        onClick={() => onSubmit(answers)}
      >
        Next
      </button>
    </>
  );
};

const ScoringQuestion = ({
  question,
  onSubmit,
}: {
  question: Question;
  onSubmit: (response: Answer[]) => void;
}) => {
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleScoreChange = (id: string, score: number) => {
    setScores((prev) => ({ ...prev, [id]: score }));
  };

  return (
    <>
      <div className="space-y-4">
        {question.answers.map((answer) => (
          <div key={answer.id} className="flex items-center space-x-4">
            <span>{answer.text}</span>
            <select
              className="border rounded-md p-2 bg-gray-700 text-white"
              onChange={(e) => handleScoreChange(answer.id, Number(e.target.value))}
            >
              <option value="0">Assign Score</option>
              <option value="1">1 (Inspires me the most)</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 (Haven't heard of them)</option>
            </select>
          </div>
        ))}
      </div>
      <button
        className="mt-4 w-full bg-gold hover:bg-yellow-500 text-darkblue py-2 rounded-md"
        onClick={() => onSubmit(Object.entries(scores).map(([id, score]) => ({ id, text: question.answers.find(answer => answer.id === id)?.text || '', score })))}
      >
        Next
      </button>
    </>
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

export default AppQuiz;
