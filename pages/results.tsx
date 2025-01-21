"use client";
import React from "react";

const Results: React.FC = () => {
  const coaches = [
    {
      name: "Joseph Darling",
      picture: "/file.jpg", // Replace with actual image paths
      description: "Expert in sales and trading with 10 years of experience.",
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold mb-8 text-center text-yellow-500">
          Congratulations on completing the quiz  🎉
        </h1>
        <p className="text-lg mb-6 text-center text-gray-300">
          Enter your email below to receive a your personalised report within seconds.
        </p>

        {/* Email Input Section */}
        <div className="flex justify-center mb-10">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-lg px-4 py-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Coaches Section */}
        <h2 className="text-3xl flex items-center justify-center mb-8 text-yellow-500">
          Available Coaches
        </h2>
        <div className="flex items-center justify-center space-x-4">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Coach Image */}
              <img
                src={coach.picture}
                alt={coach.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                {/* Coach Name */}
                <h3 className="text-xl font-bold mb-2">{coach.name}</h3>
                {/* Coach Description */}
                <p className="text-sm text-gray-400 mb-4">
                  {coach.description}
                </p>
                {/* Book Call Button */}
                <button className="w-full py-3 px-4 bg-yellow-500 text-gray-900 font-bold rounded-md transition-all hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-300">
                  Book a Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
