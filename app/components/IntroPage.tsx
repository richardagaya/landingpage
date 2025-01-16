"use client";
import { useRouter } from "next/navigation";

const IntroPage: React.FC = () => {
  const router = useRouter();

  const navigateToQuiz = (): void => {
    router.push("/skillstest");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-600 to-purple-500 text-white">
      <div className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to the Quiz!</h1>
        <p className="text-lg mb-6">
          Test your knowledge with fun and challenging questions. Click the
          button below to get started!
        </p>
        <button
          onClick={navigateToQuiz}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
