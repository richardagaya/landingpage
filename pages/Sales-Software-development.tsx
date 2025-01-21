"use client";
import router from "next/router";
import React, { useState, useEffect } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const Quiz: React.FC = () => {
  const questions: Question[] = [
    {
      id: 1,
      text: "Would you rather spend 10 hours a day...",
      options: ["Talking to 100 people", "Coding or Programming"],
    },
    {
      id: 2,
      text: "Are you more Extrovert or Introvert?",
      options: ["Extrovert", "Introvert"],
    },
    {
      id: 3,
      text: "Would you rather work in an office or at home?",
      options: ["Office", "Home"],
    },
    {
      id: 4,
      text: "What do you think is the most important in selling?",
      options: ["Energy", "CRM system"],
    },
    {
      id: 5,
      text: "Which activity do you enjoy the most?",
      options: ["Negotiating or pitching ideas to others", "Optimizing systems"],
    },
    {
      id: 6,
      text: "How do you prefer to approach prospects?",
      options: [
        "Directly, face-to-face or over calls.",
        "Using automated tools to drive engagement.",
      ],
    },
    {
      id: 7,
      text: "How do you approach solving challenges?",
      options: ["Engage in conversations", "Go straight to chatGPT"],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(15); // Timer for each question
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  // Handle timer for each question
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      setTimeUp(true);
    }
  }, [timeLeft, quizCompleted]);

  const handleOptionSelect = (option: string) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestionIndex] = option;
    setSelectedOptions(updatedSelections);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(15); // Reset timer for next question
      setTimeUp(false); // Reset time-up status
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setTimeLeft(15);
    setQuizCompleted(false);
    setTimeUp(false);
  };

  const handleViewResults = () => {
    router.push("/results");
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div
      className="min-h-screen flex justify-center items-center text-white"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!quizCompleted ? (
        <div className="max-w-md w-full p-6 bg-gray-800 bg-opacity-80 rounded-md shadow-lg">
          <h2 className="text-lg font-bold text-center mb-4">
          SALES AND SOFTWARE DEVELOPMENT
          </h2>

          {/* Timer */}
          {!timeUp && (
            <div className="text-center mb-4">
              <p className="text-lg font-bold">
                Time Left: <span className="text-yellow-500">{timeLeft}s</span>
              </p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="relative w-full h-4 bg-gray-600 rounded-full mb-4">
            <div
              className="absolute top-0 left-0 h-4 bg-yellow-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Question and Options */}
          {!timeUp ? (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-center mb-4">
                {currentQuestion.text}
              </h3>
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`block w-full py-3 px-4 text-center rounded-lg font-medium ${
                      selectedOptions[currentQuestionIndex] === option
                        ? "bg-yellow-500 text-gray-900"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-red-500 mb-4">
                Time is up!
              </h3>
            </div>
          )}

          {/* Next Button */}
          {!timeUp && (
            <button
              onClick={handleNext}
              className="w-full py-3 px-4 bg-yellow-500 text-gray-900 font-bold rounded-md hover:bg-yellow-400"
            >
              {currentQuestionIndex < questions.length - 1 ? "NEXT" : "FINISH"}
            </button>
          )}
        </div>
      ) : (
        <div className="max-w-md w-full p-6 bg-gray-800 bg-opacity-80 rounded-md shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Quiz Completed!</h2>
          <p className="mb-6">Thank you for completing the quiz.</p>
          <button
              onClick={handleViewResults}
              className="px-6 py-3 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 mb-4"
            >
              View Results
            </button>

          <button
            onClick={handleRetakeQuiz}
            className="w-full py-3 px-4 bg-gray-700 text-white font-bold rounded-md hover:bg-gray-600"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
