"use client";
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
      text: "How would you offer your service or product?",
      options: ["Consistently Posting on Social Media", "Working from Home and Making Ads"],
    },
    {
      id: 2,
      text: "When approaching a new opportunity, what excites you the most?",
      options: ["Learning about new Products in the market", "Building a following through content"],
    },
    {
      id: 3,
      text: "Would you rather spend 10 hours a day?",
      options: ["Comparing prices of products", "Producing enjoyable content"],
    },
    {
      id: 4,
      text: "How do you approach solving challenges?",
      options: ["Making content to address the issues", "Comparing costs of solutions"],
    },
    {
      id: 5,
      text: "How do you convince someone?",
      options: ["Through advertisements", "Creating an expose in the form of a video"],
    },
    {
      id: 6,
      text: "What method would you use to find leads?",
      options: ["Creating content with CTAs", "Advertising"],
    },
    {
      id: 7,
      text: "Which activity do you enjoy the most?",
      options: ["Making YouTube videos", "Designing a storefront"],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(false);
    setName("");
    setEmail("");
  };

  const handleViewResults = async () => {
    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }

    try {
      const response = await fetch("/api/send-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, answers: selectedOptions }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Failed to send results");
      }
    } catch (error) {
      console.error("Error sending results:", error);
    }
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

          <div className="relative w-full h-4 bg-gray-600 rounded-full mb-4">
            <div
              className="absolute top-0 left-0 h-4 bg-yellow-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

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

          <button
            onClick={handleNext}
            className="w-full py-3 px-4 bg-yellow-500 text-gray-900 font-bold rounded-md hover:bg-yellow-400"
          >
            {currentQuestionIndex < questions.length - 1 ? "NEXT" : "FINISH"}
          </button>
        </div>
      ) : !submitted ? (
        <div className="max-w-md w-full p-6 bg-gray-800 bg-opacity-80 rounded-md shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 mb-4 bg-gray-700 text-white rounded"/>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 bg-gray-700 text-white rounded"/>
          <button onClick={handleViewResults} className="w-full py-3 bg-yellow-500 text-gray-900 font-bold rounded-md">View Results</button>
        </div>
      ) : (
        <p className="text-center">Results sent successfully!</p>
      )}
    </div>
  );
};

export default Quiz;
