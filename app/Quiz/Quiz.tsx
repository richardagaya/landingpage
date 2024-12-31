"use client";
import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const quizData: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Mars"],
    correctAnswer: "Jupiter",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
    correctAnswer: "Shakespeare",
  },
  {
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "500,000 km/s"],
    correctAnswer: "300,000 km/s",
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
    correctAnswer: "Oxygen",
  },
];

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (currentQuestionIndex >= quizData.length) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Quiz Completed</h2>
        <p>Your score: {score}/{quizData.length}</p>
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  // Calculate progress percentage
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

  return (
    <div className="max-w-lg mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-300 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-center mt-1">{Math.round(progress)}% Complete</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full p-3 border rounded-md text-left ${
              selectedAnswer === option
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedAnswer && (
        <button
          onClick={handleNextQuestion}
          className="mt-6 w-full p-3 bg-green-500 text-white rounded-md"
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Quiz;
