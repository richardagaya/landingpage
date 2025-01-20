"use client";
import React, { useState, useEffect } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const Quiz: React.FC = () => {
  const questions: Question[] = [
        {
          "id": 1,
          "text": "Would you rather spend 10 hours a day...",
          "options": ["Comparing prices of products", "Studying charts and numbers"]
        },
        {
          "id": 2,
          "text": "How do you approach solving challenges?",
          "options": ["Comparing costs of solutions", "Analyzing the market for decision making"]
        },
        {
          "id": 3,
          "text": "When approaching a new opportunity, what excites you most?",
          "options": ["Learning about new patterns and trends in the market", "Learning about new products in the marketplace"]
        },
        {
          "id": 4,
          "text": "You’re tasked with growing a new income stream. What’s your strategy?",
          "options": ["Designing a product line, optimizing a storefront, and running free ad campaigns to boost sales", "Monitoring financial markets and making timely trades to capitalize on opportunities"]
        },
        {
          "id": 5,
          "text": "How do you prefer to manage risk when working toward a financial goal?",
          "options": ["Testing and refining product offers, and adjusting prices", "Setting stop-loss orders, and diversifying trades"]
        },
        {
          "id": 6,
          "text": "Which activity do you enjoy the most?",
          "options": ["Designing a storefront", "Studying charts and numbers"]
        },
        {
          "id": 7,
          "text": "How would you convince someone?",
          "options": ["Using public information", "Through Advertising"]
        }
      
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(15); // Total quiz time in seconds
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Handle global timer
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setQuizCompleted(true);
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
    } else {
      setQuizCompleted(true);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div
      className="min-h-screen flex justify-center items-center text-white"
      style={{
        backgroundImage: "url('/background.png')", // Ensure the path to your image is correct
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!quizCompleted ? (
        <div className="max-w-md w-full p-6 bg-gray-800 bg-opacity-80 rounded-md shadow-lg">
          <h2 className="text-lg font-bold text-center mb-4">
            FOR THE SALES AND TRADING SKILLS TEST
          </h2>

          {/* Timer */}
          <div className="text-center mb-4">
            <p className="text-lg font-bold">
              Time Left: <span className="text-yellow-500">{timeLeft}s</span>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-4 bg-gray-600 rounded-full mb-4">
            <div
              className="absolute top-0 left-0 h-4 bg-yellow-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Question and Options */}
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

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-full py-3 px-4 bg-yellow-500 text-gray-900 font-bold rounded-md hover:bg-yellow-400"
          >
            {currentQuestionIndex < questions.length - 1 ? "NEXT" : "FINISH"}
          </button>
        </div>
      ) : (
        <div className="max-w-md w-full p-6 bg-gray-800 bg-opacity-80 rounded-md shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Time has expired!</h2>
          <p className="mb-6">Thank you for completing the quiz.</p>
          <p className="font-semibold">
            Your Answers: {selectedOptions.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
