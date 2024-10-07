import ChallengeComponent from "./ChallengeComponent";
import NewsComponent from "./NewsComponent";
import QuizComponent from "./QuizComponent";
import RankingComponent from "./RankingComponent";
import UserComponent from "./UserComponent";

export default function InputComponent({ selectedMenu }) {
  return [
    <UserComponent />,
    <RankingComponent />,
    <ChallengeComponent />,
    <QuizComponent />,
    <NewsComponent />,
  ][selectedMenu];
}
