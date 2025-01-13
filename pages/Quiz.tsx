"use client";
import React, { useState } from "react";
import RankingQuestion from "../app/components/RankingQuestion";
import ScoringQuestion from "../app/components/ScoringQuestion";
import { questions, isFullName } from "../helpers";

const AppQuiz = () => {
  const [userName, setUserName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex] || null;

  const handleNameSubmit = () => {
    if (isFullName(userName)) {
      setIsNameEntered(true);
    } else {
      alert("Please enter your full name (at least two words).");
    }
  };

  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  const goToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      alert("Quiz Completed!");
    }
  };

  if (!isNameEntered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-96 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
          <label htmlFor="name" className="block mb-2 text-gray-300">
            Please enter your full name to get started:
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white mb-4"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            onClick={handleNameSubmit}
            disabled={!isFullName(userName)}
            className={`w-full px-4 py-2 rounded ${
              isFullName(userName)
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Name
          </button>
        </div>
      </div>
    );
  }

  if (!isQuizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-96 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">
            Hey, {userName}! Welcome!
          </h1>
          <p className="text-gray-300 mb-4">Click below to start your quiz.</p>
          <button
            onClick={startQuiz}
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div className="text-red-500">Error: Question not found!</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-96 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-yellow-500">
          Question {currentQuestionIndex + 1}/{questions.length}
        </h2>
        <p className="mb-4 text-gray-300">{currentQuestion.questionText}</p>
        {currentQuestion.type === "ranking" ? (
          <RankingQuestion question={currentQuestion} onSubmit={goToNextQuestion} />
        ) : (
          <ScoringQuestion question={currentQuestion} onSubmit={goToNextQuestion} />
        )}
      </div>
    </div>
  );
};

export default AppQuiz;
