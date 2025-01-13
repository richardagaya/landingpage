import React, { useState } from "react";

const ScoringQuestion = ({ question, onSubmit }) => {
  const [scores, setScores] = useState(
    question.answers.map((answer) => ({ ...answer, score: 0 }))
  );

  const handleScoreChange = (id, score) => {
    setScores((prevScores) =>
      prevScores.map((item) => (item.id === id ? { ...item, score } : item))
    );
  };

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-300 mb-2">
        <span>1 (Most Inspiring / Experienced)</span>
        <span>5 (Least Inspiring / None)</span>
      </div>
      {scores.map((item) => (
        <div key={item.id} className="mb-4">
          <label className="block text-gray-300 mb-2">{item.text}</label>
          <input
            type="number"
            min="1"
            max="5"
            value={item.score}
            onChange={(e) => handleScoreChange(item.id, parseInt(e.target.value, 10) || 0)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
      ))}
      <button
        onClick={() => onSubmit(scores)}
        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Next
      </button>
    </div>
  );
};

export default ScoringQuestion;
