import { useState } from 'react';
import { useRouter } from 'next/router';
import { questions, isFullName, industryUrlMap, Answer } from '../helpers'; // Ensure correct path

const Quiz = () => {
  const [userName, setUserName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]); // Store selected answers for the last question
  const router = useRouter();

  const handleNameSubmit = () => {
    if (isFullName(userName)) {
      setIsNameEntered(true);
    } else {
      alert("Please enter a single name (e.g., first name).");
    }
  };

  const handleAnswerSelect = (answer: Answer) => {
    if (currentQuestionIndex === questions.length - 1) { // Only for the last question
      if (selectedAnswers.includes(answer)) {
        setSelectedAnswers(selectedAnswers.filter(item => item !== answer));
      } else if (selectedAnswers.length < 2) {
        setSelectedAnswers([...selectedAnswers, answer]);
      } else {
        alert("You can only select two industries. Please deselect one before adding another.");
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      if (selectedAnswers.length === 2) {
        const sortedPair = selectedAnswers.map(a => a.text).sort().join(' & ');
        const path = industryUrlMap[sortedPair as keyof typeof industryUrlMap];
        if (path) {
          router.push(path);
        } else {
          alert("No route found for the selected industries.");
        }
      } else {
        alert("Please select exactly two industries.");
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (!isNameEntered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darkblue">
        <div className="p-12 bg-white shadow-md rounded">
          <h1 className="text-lg font-bold mb-4 text-gold">Enter your name to start the quiz</h1>
          <input
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            placeholder="Your Name"
            className="border p-2 rounded w-full mb-4"
          />
          <button onClick={handleNameSubmit} className="bg-gold hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkblue">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {currentQuestion.questionText}
        </h1>
        <div className="space-y-3">
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => handleAnswerSelect(answer)}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                selectedAnswers.includes(answer)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-yellow-500 hover:text-white"
              }`}
            >
              {answer.text}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          {currentQuestionIndex > 0 && (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              className="py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNextQuestion}
            className="py-2 px-6 rounded-lg bg-blue-200 text-white hover:bg-gold transition-all duration-300"
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
