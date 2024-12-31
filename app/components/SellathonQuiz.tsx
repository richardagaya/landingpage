// components/SellathonQuiz.tsx
"use client"
import { useState } from "react";

interface Question {
  question: string;
  options: string[];
}

const sellathonQuestions: Question[] = [
  { question: "Do you have experience in online sales?", options: ["Yes", "No", "A little", "Not sure"] },
  { question: "What platform do you prefer for selling?", options: ["Ebay", "Amazon", "Shopify", "Etsy"] },
  { question: "Do you use social media for marketing?", options: ["Yes", "No", "Sometimes", "Not yet"] },
  { question: "Have you ever run paid ads?", options: ["Yes", "No", "Sometimes", "Not yet"] },
  { question: "What is your average monthly revenue from sales?", options: ["Less than $500", "$500-$1000", "$1000-$5000", "Over $5000"] },
];

const SellathonQuiz: React.FC<{ onNext: () => void; currentQuestionIndex: number; progress: number }> = ({ onNext, currentQuestionIndex, progress }) => {
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

  const currentQuestion = sellathonQuestions[currentQuestionIndex];

  return (
    <div className="max-w-lg mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-gray-300 rounded-full">
          <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Sellathon Questions */}
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

export default SellathonQuiz;
