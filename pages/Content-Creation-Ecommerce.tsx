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
      text: "How would you offfer your service or product?",
      options: ["Consistently Posting on Social Media", "Working from Home and Making Ads"],
    },
    {
      id: 2,
      text: "When Approaching a new opportunity what excites you the most?",
      options: ["Learning about new Products in the market", "Building a following through content"],
    },
    {
      id: 3,
      text: "Would you rather spend 10 hours a day",
      options: ["Comparing piees of products", "Producing Enjoyable Content"],
    },
    {
      id: 4,
      text: "How do you approach solving challenges",
      options: ["Making Content to Address the Issues", "Comparing Costs of Solutions"],
    },
    {
      id: 5,
      text: "How do you convince someone?",
      options: [" Through Avertisements", "Creating an expose In the form of a video"],
    },
    {
      id: 6,
      text: "What method would you use to find leads?",
      options: ["Creating content with CTA's", "Advertising"],
    },
    {
      id: 7,
      text: "Which activity do you enjoy the most?",
      options: ["Making youtube videos", "Designing a storefront"],
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
           ECOMMERCE AND CONTENT CREATION QUIZ
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