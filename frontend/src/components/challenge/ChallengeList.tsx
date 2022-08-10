import { ChallengeItemState } from "../../store/challenge";
import ChallengeItem from "./ChallengeItem";

const ChallengeList: React.FC<{ challenges: ChallengeItemState[] }> = ({
  challenges,
}) => {
  return (
    <ul>
      {challenges.map((challenge) => (
        <ChallengeItem key={challenge.id} challenge={challenge} />
      ))}
    </ul>
  );
};
export default ChallengeList;
