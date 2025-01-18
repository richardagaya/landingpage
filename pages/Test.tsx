import React, { useState, } from 'react';
import { useRouter } from 'next/router';

const Quiz = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isNameEntered, ] = useState(false);
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
    // Dynamic font size based on name length
    const fontSize = firstName.length + lastName.length > 15 ? 'text-lg md:text-2xl' : 'text-2xl md:text-4xl';

    return (
      <div
        className="flex h-screen items-center justify-center"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-darkbg rounded-lg p-10 md:p-12 shadow-lg text-center text-white w-3/4 md:w-1/2 lg:w-1/3">
          <h1 className={`${fontSize} font-bold mb-4`}>
            HEY <span className="text-gold">{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}!</span>
          </h1>
          <p className="text-base md:text-lg mb-8">Welcome to the Quiz!</p>
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
  }

  // No questions displayed, user redirected to another page after loading
  return null;
};

export default Quiz;
