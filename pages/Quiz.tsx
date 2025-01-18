"use client";
import { useRouter } from "next/router";

const Quiz = () => {
  const router = useRouter();

  const goToQuestion = (questionNumber: number) => {
    router.push(`/quiz/question${questionNumber}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-96 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Welcome to the  skillstest</h2>
        <p className="mb-6 text-gray-300">
          Answer the following questions to determine your path to financial freedom.
        </p>
        <button
          onClick={() => goToQuestion(1)}
          className="w-full bg-basecolor hover:bg-second text-white py-2 rounded-md"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Quiz;
