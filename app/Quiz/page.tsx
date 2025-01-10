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
import { useState, useEffect } from "react";

type Answer = {
  id: string;
  text: string;
};

const questions = [
  {
    questionText: "Who's Success Story Inspires You The Most?",
    answers: [
      { id: "1", text: "Jeff Bezos" },
      { id: "2", text: "Tony Robbins" },
      { id: "3", text: "Mr Beast" },
      { id: "4", text: "Elon Musk" },
      { id: "5", text: "Tony Robbins" },
    ],
  },
  // Additional questions...
];

const Quiz = () => {
  const [stage, setStage] = useState<"nameInput" | "intro" | "loading" | "quiz">("nameInput");
  const [userName, setUserName] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(questions[currentQuestion].answers);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    if (stage === "loading") {
      const timer = setTimeout(() => {
        setStage("quiz");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setAnswers((prev) => {
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
      setAnswers(questions[nextQuestion].answers);
    } else {
      alert("Quiz Completed!");
    }
  };

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setStage("intro");
    } else {
      alert("Please enter your name.");
    }
  };

  if (stage === "nameInput") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-semibold mb-4">Welcome to the Quiz!</h1>
        <p className="text-lg text-gray-300 mb-6 text-center">
          Please enter your name to get started.
        </p>
        <input
          type="text"
          className="bg-gray-700 text-white p-2 rounded-md mb-4"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md"
          onClick={handleNameSubmit}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (stage === "intro") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <h1 className="text-3xl font-semibold mb-4">Welcome to Our Quiz, {userName}!</h1>
        <p className="text-lg text-gray-300 mb-6 text-center">
          This quiz is designed to understand your preferences, interests, and inspirations. Based
          on your answers, we&apos;ll guide you toward exciting career opportunities!
        </p>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md"
          onClick={() => setStage("loading")}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (stage === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <p className="text-xl font-medium mb-4">Hey {userName}, getting your quiz ready...</p>
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-96 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Question {currentQuestion + 1}/3</h2>
        <p className="mb-4 text-gray-300">{questions[currentQuestion].questionText}</p>
        <p className="mb-4 text-sm text-gray-400">
          Place the options in order of most like you to least like you.
        </p>

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
          className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md"
          onClick={goToNextQuestion}
        >
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
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
