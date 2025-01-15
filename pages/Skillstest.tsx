import { useState } from 'react';
import { useRouter } from 'next/router';
import { questions, Answer } from '../helpers'; // Ensure correct path

const Quiz = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const router = useRouter();

  const handleNameSubmit = () => {
    if (firstName.trim() && lastName.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsNameEntered(true);
      }, 2000); // Simulate a loading time of 2 seconds
    } else {
      alert("Please enter both your first and last names.");
    }
  };

  const handleAnswerSelect = (answer: Answer) => {
    setSelectedAnswers([...selectedAnswers, answer]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push('/results'); // Navigate to results page or handle quiz completion
    }
  };

  const fullName = `${firstName} ${lastName}`;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <h1 className="text-xl md:text-3xl">Hey {fullName}!</h1>
          <p className="text-lg">Welcome to the Quiz!</p>
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      </div>
    );
  }

  if (!isNameEntered) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="p-6 bg-gray-800 text-center rounded shadow-lg">
          <h1 className="text-xl text-white font-bold mb-4">Whats your name?</h1>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
            className="input bg-gray-700 text-white border border-gray-600 p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
            className="input bg-gray-700 text-white border border-gray-600 p-2 rounded w-full mb-4"
          />
          <button onClick={handleNameSubmit} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Let's Go
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-xl p-6 bg-gray-800 text-center rounded shadow-lg">
        <h1 className="text-xl text-white font-bold mb-6">{currentQuestion.questionText}</h1>
        <div className="space-y-4">
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => handleAnswerSelect(answer)}
              className="block w-full py-2 px-4 text-sm text-white bg-blue-500 hover:bg-blue-700 rounded"
            >
              {answer.text}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          {currentQuestionIndex > 0 && (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNextQuestion}
            className="py-2 px-6 bg-green-500 hover:bg-green-700 text-white font-bold rounded"
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
