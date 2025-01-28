import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Quiz = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNameSubmit = () => {
    if (firstName.trim() && lastName.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        router.push('/Quiz'); // Redirect to the next page after loading
      }, 2000);
    } else {
      alert("Please enter both your first and last names.");
    }
  };

  if (isLoading) {
    // No UI is shown during loading, just a blank screen
    return null;
  }

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
};

export default Quiz;