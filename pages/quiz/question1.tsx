import Question from "@/app/components/Question";

const Question1 = () => {
  return (
    <Question
      questionText="Who's Success Story Inspires You The Most?"
      answers={[
        { id: "1", text: "Tony Robins", imageUrl: "/Tony Robins.png" },
        { id: "2", text: "Elon Musk", imageUrl: "/Elon Musk.png" },
        { id: "3", text: "Mr Beast", imageUrl: "/Mr Beast.png" },
        { id: "4", text: "Jeff Bezos", imageUrl: "/Jeff Bezos.png" },
        { id: "5", text: "Warren Buffet", imageUrl: "/Warren Buffet.png" },
      ]}
      nextQuestion="/quiz/question2"
    />
  );
};

export default Question1;
