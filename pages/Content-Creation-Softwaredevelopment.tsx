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
      id: 1,
      text: "Would you rather spend 10 hours a day...",
      options: ["Producing Enjoyable Content", "Coding or Programming"]
    },
    {
      id: 2,
      text: "Would you rather design in the front end, or write code in the back end?",
      options: ["Design in the front end", "Write code"]
    },
    {
      id: 3,
      text: "What type of work would you be leaning towards?",
      options: ["Creative work", "Methodical work"]
    },
    {
      id: 4,
      text: "How would you convince someone?",
      options: ["Through story telling", "Using data"]
    },
    {
      id: 5,
      text: "When approaching a new opportunity, what excites you most?",
      options: ["Sharing ideas through content", "Experimenting with systems"]
    },
    {
      id: 6,
      text: "How do you feel about privacy?",
      options: ["I choose fame", "I choose privacy"]
    },
    {
      id: 7,
      text: "What method would you use to find leads?",
      options: ["Creating content with Call to Actions", "Automated Tools"]
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
          <h2 className="text-xl font-bold mb-4">Time has expired</h2>
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
