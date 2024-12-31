// components/HackathonQuiz.tsx
"use client"
import { useState } from "react";

interface Question {
  question: string;
  options: string[];
}

const hackathonQuestions: Question[] = [
  { question: "Have you participated in any hackathons?", options: ["Yes", "No", "A few", "Not sure"] },
  { question: "What is your strongest skill?", options: ["Frontend Development", "Backend Development", "UI/UX", "Full Stack"] },
  { question: "Do you prefer solo projects or team projects?", options: ["Solo", "Team", "Either", "Depends on the project"] },
  { question: "What tech stack are you most comfortable with?", options: ["JavaScript", "Python", "C++", "Java"] },
  { question: "How do you approach problem-solving?", options: ["Algorithms", "Brainstorming", "Trial and Error", "Others"] },
];

const HackathonQuiz: React.FC<{ onNext: () => void; currentQuestionIndex: number; progress: number }> = ({ onNext, currentQuestionIndex, progress }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      onNext();
      setSelectedAnswer(null);
    }
  };

  const currentQuestion = hackathonQuestions[currentQuestionIndex];

  return (
    <div className="max-w-lg mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-gray-300 rounded-full">
          <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Hackathon Questions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-3 border rounded-md text-left ${
                selectedAnswer === option ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedAnswer && (
          <button
            onClick={handleNextQuestion}
            className="mt-6 w-full p-3 bg-green-500 text-white rounded-md"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default HackathonQuiz;
