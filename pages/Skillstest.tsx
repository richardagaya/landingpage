import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { questions, Answer } from '../helpers'; // Ensure the path is correct

const Quiz = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const router = useRouter();

  const handleNameSubmit = () => {
    if (firstName.trim() && lastName.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsNameEntered(true);
      }, 2000);
    } else {
      alert("Please enter both your first and last names.");
    }
  };

  const handleAnswerSelect = (answer: Answer) => {
    setSelectedAnswers([...selectedAnswers, answer]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push('/results');
    }
  };

  const fullName = `${firstName} ${lastName}`;

  if (isLoading) {
    return (
      <div
        className="flex h-screen items-center justify-center"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-xl md:text-3xl">Hey {fullName}!</h1>
          <p className="text-lg">Welcome to the Quiz!</p>
          {/* Spinner */}
          <div className="loader ease-linear rounded-full border-8 border-gray-300 border-t-gold h-32 w-32 animate-spin mt-6"></div>
        </div>
      </div>
    );
  }
  

  if (!isNameEntered) {
    return (
      <div
        className="flex h-screen items-center justify-center"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="p-8 bg-darkbg text-center rounded-lg shadow-md w-[90%] max-w-md">
          <h1 className="text-2xl text-white font-semibold mb-6 tracking-wide">
            WHAT IS YOUR <span className="font-bold">NAME?</span>
          </h1>
          <div className="flex gap-4 justify-center mb-6">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="FIRST NAME"
              className="bg-first text-gray-300 border border-gray-700 px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 uppercase tracking-wide w-[45%]"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="LAST NAME"
              className="bg-first text-gray-300 border border-gray-700 px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 uppercase tracking-wide w-[45%]"
            />
          </div>
          <button
            onClick={handleNameSubmit}
            className="bg-basecolor hover:bg-second text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg text-sm uppercase tracking-wider transition-all"
          >
            PROCEED
          </button>
        </div>
      </div>
    );
    
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-xl p-6 bg-gray-800 text-center rounded shadow-lg">
        <h1 className="text-xl text-white font-bold mb-6">{currentQuestion.questionText}</h1>
        <div className="space-y-4">
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => handleAnswerSelect(answer)}
              className="block w-full py-2 px-4 text-sm text-white bg-blue-500 hover:bg-blue-700 rounded"
            >
              {answer.text}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          {currentQuestionIndex > 0 && (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNextQuestion}
            className="py-2 px-6 bg-green-500 hover:bg-green-700 text-white font-bold rounded"
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
