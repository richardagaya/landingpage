import React, { useState } from "react";
import Question from "@/app/components/Question";
import TimedTest from "../TimedTest";

const Question3 = () => {
  const [showTimedTest, setShowTimedTest] = useState(false);
  const [targetPath, setTargetPath] = useState("");

  // Handle the finish action when the user selects answers
  const handleFinish = (sortedAnswers: { id: string; text: string }[]) => {
    // Take the top two answers
    const topTwo = sortedAnswers.slice(0, 2).map((answer) => answer.text);

    // Generate both possible key combinations to match the paths
    const key1 = topTwo.sort().join(" & ");  // Sorted order
    const key2 = topTwo.reverse().join(" & "); // Reversed order

    // Debugging: Log the keys generated
    console.log("Generated keys:", key1, key2);

    // Paths object that maps combined answers to a target path
    const paths: { [key: string]: string } = {
      "Content Creation & Ecommerce": "/Content-Creation-Ecommerce",
      "Content Creation & Software Development": "/Content-Creation-Softwaredevelopment",
      "Content Creation & Trading": "/Content-Creation-Trading",
      "Ecommerce & Trading": "/Ecommerce-Trading",
      "Software Development & Ecommerce": "/Software-development-Ecommerce",
      "Software Development & Trading": "/Software-development-Trading",
      "Sales & Content Creation": "/Sales-Content-Creation",
      "Sales & Ecommerce": "/Sales-Ecommerce",
      "Sales & Software Development": "/Sales-Software-development",
      "Sales & Trading": "/Sales-trading",
    };

    // Debugging: Log the paths object to check if it includes the keys
    console.log("Paths object:", paths);

    // Check if either key1 or key2 matches any path, default to fallback if not found
    const path = paths[key1] || paths[key2] || "/fallback-path";

    // Debugging: Log the selected path
    console.log("Selected path:", path);

    // Set the target path and show the timed test component
    setTargetPath(path);
    setShowTimedTest(true);
  };

  // Show the timed test component if it's triggered
  if (showTimedTest) {
    return <TimedTest targetPath={targetPath} />;
  }

  // Render the question component
  return (
    <Question
      questionText="Which industry would you be most excited to gain skill in?"
      answers={[
        { id: "6", text: "Ecommerce", imageUrl: "/Ecommerce.png" },
        { id: "7", text: "Sales", imageUrl: "/Sales.png" },
        { id: "8", text: "Content Creation", imageUrl: "/Content Creation.png" },
        { id: "9", text: "Software Development", imageUrl: "/Software Development.png" },
        { id: "10", text: "Trading", imageUrl: "/Trading.png" },
      ]}
      isLastQuestion={true}
      onFinish={handleFinish}
    />
  );
};

export default Question3;
