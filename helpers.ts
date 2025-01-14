// helpers.ts

// Define the structure for each answer
export interface Answer {
  id: string; // You have string ids for answers
  text: string;
}

// Define the structure for each question
export interface Question {
  questionText: string;
  type: string;
  answers: Answer[];
}

// Sample questions array with the Question type
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

// Industry URL mapping
export const industryUrlMap = {
  "Ecommerce & Sales": "/SalesEcommerce",
  "Sales & Content Creation": "/SalesContentCreation",
  // More mappings as necessary
};
