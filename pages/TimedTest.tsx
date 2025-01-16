// components/TimedTest.tsx
import React from 'react';

const TimedTest: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-[url('/background.png')] bg-cover flex items-center justify-center flex-col text-center p-4">
      <div className="bg-black bg-opacity-50 p-10 rounded-lg">
        <h1 className="text-gold text-4xl mb-4">YOU ARE ONTRACC!</h1>
        <p className="text-white text-lg mb-10">The Remainder of the Skills Test will be timed.</p>
        <div>
          <p className="text-gray-300 mb-4">Timer will expire and move you to the next page.</p>
          <p className="text-gray-300">You can pause or go back, but it reflects your confidence in your choices.</p>
        </div>
        <button className="mt-10 bg-yellow-500 text-white font-bold py-2 px-8 rounded-full hover:bg-yellow-600 transition duration-300">
          PROCEED
        </button>
      </div>
    </div>
  );
};

export default TimedTest;
