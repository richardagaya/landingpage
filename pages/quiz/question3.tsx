import React, { useState } from "react";
import Question from "@/app/components/Question";
import TimedTest from "../TimedTest";

const Question3 = () => {
  const [showTimedTest, setShowTimedTest] = useState(false);
  const [targetPath, setTargetPath] = useState("");

  const handleFinish = (sortedAnswers: { id: string; text: string }[]) => {
    const topTwo = sortedAnswers.slice(0, 2).map((answer) => answer.text);

    const paths: { [key: string]: string } = {
      "Sales & Content Creation": "/path-sales-content-creation",
      "Sales & Hackathon": "/path-sales-hackathon",
      "Sales & Ecommerce": "/path-sales-ecommerce",
      "Sales & Trading": "/path-sales-trading",
      "Content Creation & Hackathon": "/path-content-hackathon",
      "Content Creation & Ecommerce": "/path-content-ecommerce",
      "Content Creation & Trading": "/path-content-trading",
      "Hackathon & Ecommerce": "/path-hackathon-ecommerce",
      "Hackathon & Trading": "/path-hackathon-trading",
      "Ecommerce & Trading": "/path-ecommerce-trading",
    };

    const key: string = topTwo.join(" & ");
    const path = paths[key] || "/fallback-path";

    setTargetPath(path); // Store the target path
    setShowTimedTest(true); // Show the TimedTest component
  };

  if (showTimedTest) {
    return <TimedTest targetPath={targetPath} />;
  }

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
