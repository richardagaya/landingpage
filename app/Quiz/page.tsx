"use client";
import React, { useState } from "react";
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

type RankingResponse = Answer[];
type ScoringResponse = { id: string; text: string; score: number }[];
type QuizResponse = RankingResponse | ScoringResponse;

const questions: Question[] = [
  {
    questionText: "Who&apos;s Success Story Inspires You The Most?",
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
];

const AppQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ question: Question; response: QuizResponse }[]>([]);

  const currentQuestion = questions[currentQuestionIndex] || null;

  const goToNextQuestion = (response: QuizResponse) => {
    setResponses((prev) => [...prev, { question: currentQuestion, response }]);
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      console.log("Quiz completed. Responses:", [...responses, { question: currentQuestion, response }]);
      alert("Quiz Completed!");
    }
  };

  if (!currentQuestion) {
    return <div className="text-red-500">Error: Question not found!</div>;
  }

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
            onSubmit={(response) => goToNextQuestion(response)}
          />
        ) : (
          <ScoringQuestion
            question={currentQuestion}
            onSubmit={(response) => goToNextQuestion(response)}
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
  onSubmit: (response: RankingResponse) => void;
}) => {
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
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </DndContext>
  );
};

const ScoringQuestion = ({
  question,
  onSubmit,
}: {
  question: Question;
  onSubmit: (response: ScoringResponse) => void;
}) => {
  const [scores, setScores] = useState<{ id: string; text: string; score: number }[]>(
    question.answers.map((answer) => ({ ...answer, score: 0 }))
  );

  const handleScoreChange = (id: string, score: number) => {
    setScores((prevScores) =>
      prevScores.map((item) => (item.id === id ? { ...item, score } : item))
    );
  };

  return (
    <div>
      {scores.map((item) => (
        <div key={item.id} className="mb-4">
          <label className="block text-gray-300 mb-2">{item.text}</label>
          <input
            type="number"
            value={item.score}
            onChange={(e) => handleScoreChange(item.id, parseInt(e.target.value, 10) || 0)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
      ))}
      <button
        onClick={() => onSubmit(scores)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
};

const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="px-4 py-2 bg-gray-700 text-white rounded shadow cursor-pointer"
    >
      {children}
    </li>
  );
};

export default AppQuiz;
