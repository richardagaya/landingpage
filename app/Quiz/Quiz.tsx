"use client"
import { useState, useEffect } from "react";
import CreatorthonQuiz from "../components/CreatorthonQuiz";
import TraderthonQuiz from "../components/TraderthonQuiz";
import SellathonQuiz from "../components/SellathonQuiz";
import HackathonQuiz from "../components/HackathonQuiz";

interface Question {
  question: string;
  options: string[];
}

const generalQuestions: Question[] = [
  { question: "What excites you the most?", options: ["Creating content", "Trading stocks", "Selling products", "Building tech solutions"] },
  { question: "Which of these interests you most?", options: ["Video editing", "Stock analysis", "E-commerce", "Coding and problem-solving"] },
  { question: "How do you prefer working?", options: ["On creative projects", "On financial markets", "On online sales", "On technology and development"] },
  { question: "What do you enjoy doing in your free time?", options: ["Filming or designing", "Reading market trends", "Managing a business", "Building apps or websites"] },
  { question: "Which skill would you like to improve?", options: ["Content creation", "Stock trading", "Sales and marketing", "Tech development"] },
];

const Quiz: React.FC = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false); // State for loading spinner

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers((prev) => [...prev, answer]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < generalQuestions.length - 1) {
      setProgress(((currentQuestionIndex + 1) / generalQuestions.length) * 100);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Trigger category determination and loading spinner
      setLoading(true);
      setTimeout(() => {
        determineCategory();
        setLoading(false); // Hide the spinner after category determination
      }, 1000); // Simulate loading time
    }
  };

  const determineCategory = () => {
    const answers = selectedAnswers;
    const categoryVotes = {
      creatorthon: 0,
      traderthon: 0,
      sellathon: 0,
      hackathon: 0,
    };

    answers.forEach((answer) => {
      if (answer.includes("content") || answer.includes("design")) {
        categoryVotes.creatorthon += 1;
      }
      if (answer.includes("stock")) {
        categoryVotes.traderthon += 1;
      }
      if (answer.includes("selling") || answer.includes("business")) {
        categoryVotes.sellathon += 1;
      }
      if (answer.includes("tech") || answer.includes("coding")) {
        categoryVotes.hackathon += 1;
      }
    });

    const maxCategory = (Object.keys(categoryVotes) as (keyof typeof categoryVotes)[]).reduce((a, b) => (categoryVotes[a] > categoryVotes[b] ? a : b));
    setCategory(maxCategory);
  };

  const renderGeneralQuiz = () => {
    const currentQuestion = generalQuestions[currentQuestionIndex];

    return (
      <div className="max-w-lg mx-auto p-6">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-2 bg-gray-300 rounded-full">
            <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* General Quiz Questions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-3 border rounded-md text-left ${
                  selectedAnswers.includes(option) ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextQuestion}
            className="mt-6 w-full p-3 bg-green-500 text-white rounded-md"
            disabled={selectedAnswers.length <= currentQuestionIndex}
          >
            {currentQuestionIndex === generalQuestions.length - 1 ? "Submit" : "Next Question"}
          </button>
        </div>
      </div>
    );
  };

  const renderCategoryQuiz = () => {
    switch (category) {
      case "creatorthon":
        return <CreatorthonQuiz onNext={() => {}} currentQuestionIndex={0} progress={100} />;
      case "traderthon":
        return <TraderthonQuiz onNext={() => {}} currentQuestionIndex={0} progress={100} />;
      case "sellathon":
        return <SellathonQuiz onNext={() => {}} currentQuestionIndex={0} progress={100} />;
      case "hackathon":
        return <HackathonQuiz onNext={() => {}} currentQuestionIndex={0} progress={100} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      {!category ? (
        renderGeneralQuiz()
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">You are being directed to your path...</h2>
          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              <span>Loading...</span>
            </div>
          ) : (
            renderCategoryQuiz()
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
