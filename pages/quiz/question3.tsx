import Question from "@/app/components/Question";

const Question3 = () => {
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
    />
  );
};

export default Question3;
