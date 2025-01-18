import Question from "@/app/components/Question";

const Question2 = () => {
  return (
    <Question
      questionText="Which of these industries do you have the most experience in?"
      answers={[
        { id: "6", text: "Ecommerce", imageUrl: "/Ecommerce.png" },
        { id: "7", text: "Sales", imageUrl: "/Sales.png" },
        { id: "8", text: "Content Creation", imageUrl: "/Content Creation.png" },
        { id: "9", text: "Software Development", imageUrl: "/Software Development.png" },
        { id: "10", text: "Trading", imageUrl: "/Trading.png" },
      ]}
      nextQuestion="/quiz/question3"
    />
  );
};

export default Question2;
