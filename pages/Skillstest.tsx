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
    // Determine font size dynamically based on name length
    const fontSize = fullName.length > 15 ? 'text-lg md:text-2xl' : 'text-2xl md:text-4xl';
  
    return (
      <div
        className="flex h-screen items-center justify-center"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Enlarged Box Container */}
        <div className="bg-darkbg border border-gray-500 rounded-lg p-10 md:p-12 shadow-lg text-center text-white w-3/4 md:w-1/2 lg:w-1/3">
          {/* Adjust font sizes */}
          <h1 className={`${fontSize} font-bold mb-4`}>
            HEY <span className="text-gold">{fullName.toUpperCase()}!</span>
          </h1>
          <p className="text-base md:text-lg mb-8">Welcome to the Quiz!</p>
          {/* Centered Spinner */}
          <div className="flex justify-center">
            <div className="loader ease-linear rounded-full border-8 border-gray-300 border-t-gold h-20 w-20 md:h-32 md:w-32 animate-spin"></div>
          </div>
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
