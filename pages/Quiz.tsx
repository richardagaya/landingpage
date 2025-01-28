import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Quiz = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const goToQuestion = (questionNumber: number) => {
    setIsLoading(true); // Set loading state to true
    setTimeout(() => {
      router.push(`/quiz/question${questionNumber}`); // Redirect after 2 seconds
    }, 2000);
  };

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
        <h1 className="text-2xl text-white font-semibold mb-6 tracking-wide font-sans">
          WHAT IS YOUR <span className="font-bold">NAME?</span>
        </h1>
        <div className="flex gap-4 justify-center mb-6">
          <input
            type="text"
            placeholder="FIRST NAME"
            className="bg-first text-gray-300 border border-gray-700 px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 uppercase tracking-wide w-[45%]"
          />
          <input
            type="text"
            placeholder="LAST NAME"
            className="bg-first text-gray-300 border border-gray-700 px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 uppercase tracking-wide w-[45%]"
          />
        </div>
        <button
          onClick={() => goToQuestion(1)} // Redirect to question 1 after 2 seconds
          className="w-full bg-basecolor hover:bg-second text-white py-2 rounded-md"
          disabled={isLoading} // Disable the button during loading
        >
          {isLoading ? 'Redirecting...' : 'PROCEED'} {/* Show "Redirecting..." during loading */}
        </button>
      </div>
    </div>
  );
};

export default Quiz;