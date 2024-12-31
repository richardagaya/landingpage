// components/CreatorthonQuiz.tsx
"use client"
import { useState } from "react";

interface Question {
  question: string;
  options: string[];
}

const creatorthonQuestions: Question[] = [
  { question: "What is your creative expertise?", options: ["Video Editing", "Graphic Design", "Photography", "Writing"] },
  { question: "Do you have experience with Adobe Suite?", options: ["Yes", "No", "A little", "Not sure"] },
  { question: "What type of content do you prefer creating?", options: ["YouTube Videos", "Instagram Stories", "Blog Posts", "TikToks"] },
  { question: "Do you prefer solo or group projects?", options: ["Solo", "Group", "Either", "Neither"] },
  { question: "What platform do you use most for sharing content?", options: ["YouTube", "Instagram", "TikTok", "Others"] },
];

const CreatorthonQuiz: React.FC<{ onNext: () => void; currentQuestionIndex: number; progress: number }> = ({ onNext, currentQuestionIndex, progress }) => {
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

  const currentQuestion = creatorthonQuestions[currentQuestionIndex];

  return (
    <div className="max-w-lg mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-gray-300 rounded-full">
          <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Creatorthon Questions */}
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

export default CreatorthonQuiz;
