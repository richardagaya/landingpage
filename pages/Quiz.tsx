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

const questions = [
  {
    questionText: "Who's Success Story Inspires You The Most?",
    answers: [
      { id: "1", text: "Jeff Bezos" },
      { id: "2", text: "Tony Robbins" },
      { id: "3", text: "Mr Beast" },
      { id: "4", text: "Elon Musk" },
    ],
  },
  {
    questionText:
      "It takes 1000 hours to gain financial freedom in any skill. Which of these industries do you have the most experience in?",
    answers: [
      { id: "6", text: "Ecommerce" },
      { id: "7", text: "Sales" },
      { id: "8", text: "Content creation" },
      { id: "9", text: "Software development" },
      { id: "10", text: "Trading" },
    ],
  },
  {
    questionText: "Which industry would you be most excited to gain skill in?",
    answers: [
      { id: "11", text: "Ecommerce" },
      { id: "12", text: "Sales" },
      { id: "13", text: "Content Creation" },
      { id: "14", text: "Software development" },
      { id: "15", text: "Trading" },
    ],
  },
];

const validCombinations = [
  ["Trading", "Software development"],
  ["Sales", "Content Creation"],
  ["Sales", "Hackathon"],
  ["Sales", "Ecommerce"],
  ["Sales", "Trading"],
  ["Content Creation", "Hackathon"],
  ["Content Creation", "Ecommerce"],
  ["Content Creation", "Trading"],
  ["Hackathon", "Ecommerce"],
  ["Hackathon", "Trading"],
  ["Ecommerce", "Trading"],
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [items, setItems] = useState<Answer[]>(questions[currentQuestion].answers);
  const [errorMessage, setErrorMessage] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over?.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestion === 2) {
      const selectedCombination = items.slice(0, 2).map((item) => item.text);
      const isValidCombination = validCombinations.some(
        (combo) =>
          combo[0] === selectedCombination[0] && combo[1] === selectedCombination[1]
      );

      if (isValidCombination) {
        setErrorMessage("");
        alert("Proceeding to the next set of questions.");
        // Replace with logic to move to the next step
      } else {
        setErrorMessage("Please align your top answers to proceed.");
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setItems(questions[currentQuestion + 1].answers);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-96 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Question {currentQuestion + 1}/3</h2>
        <p className="mb-4 text-gray-300">{questions[currentQuestion].questionText}</p>
        <p className="mb-4 text-sm text-gray-400">
          Place the answers in order of most like you to least like you.
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

        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

        <button
          className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md"
          onClick={goToNextQuestion}
        >
          {currentQuestion === 2 ? "Submit" : "Next"}
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
