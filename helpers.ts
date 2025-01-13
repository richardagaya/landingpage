export type Answer = {
  id: string;
  text: string;
};

export type Question = {
  questionText: string;
  type: "scoring" | "ranking"; // Define strict types for question type
  answers: Answer[];
};

// Function to validate full name
export const isFullName = (name: string): boolean => {
  const words = name.trim().split(" ");
  return words.length > 1 && words.every((word) => word.length > 0);
};

// Questions Array
export const questions: Question[] = [
  {
    questionText: "Who Success Story Inspires You The Most?",
    type: "scoring", // Use "scoring" as defined in the Question type
    answers: [
      { id: "1", text: "Jeff Bezos" },
      { id: "2", text: "Tony Robbins" },
      { id: "3", text: "Mr Beast" },
      { id: "4", text: "Elon Musk" },
      { id: "5", text: "Warren Buffett" },
    ],
  },
  {
    questionText:
      "It takes 1000 hours to gain financial freedom in any skill. Which of these industries do you have the most experience in?",
    type: "scoring", // Use "scoring" as defined in the Question type
    answers: [
      { id: "6", text: "Ecommerce" },
      { id: "7", text: "Sales" },
      { id: "8", text: "Content creation" },
      { id: "9", text: "Software development" },
      { id: "10", text: "Trading" },
    ],
  },
  {
    questionText:
      "Which industry would you be most excited to gain skill in? Drag and order your answers according to your preference (1 = top preferred, 5 = least preferred):",
    type: "ranking", // Use "ranking" as defined in the Question type
    answers: [
      { id: "6", text: "Ecommerce" },
      { id: "7", text: "Sales" },
      { id: "8", text: "Content creation" },
      { id: "9", text: "Software development" },
      { id: "10", text: "Trading" },
    ],
  },
];
