"use client";
import router from "next/router";
import React, { useState } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const Quiz: React.FC = () => {
  const questions: Question[] = [
    {
      id: 1,
      text: "How would you convince someone?",
      options: ["Using Public Information", "Building Rapport"],
    },
    {
      id: 2,
      text: "What is your preferred work environment?",
      options: ["Collaborative", "Independent"],
    },
    {
      id: 3,
      text: "How do you handle challenges?",
      options: ["Strategic Planning", "Immediate Action"],
    },
    {
      id: 4,
      text: "What motivates you most?",
      options: ["Recognition", "Results"],
    },
    {
      id: 5,
      text: "How do you approach negotiations?",
      options: ["Finding Common Ground", "Firm Positions"],
    },
    {
      id: 6,
      text: "What is your leadership style?",
      options: ["Guiding", "Directing"],
    },
    {
      id: 7,
      text: "What is most important in a team?",
      options: ["Trust", "Skills"],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

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

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setQuizCompleted(false);
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
            CONTENT CREATION AND ECOMMERCE
          </h2>

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