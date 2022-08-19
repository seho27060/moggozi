import { ChallengeItemState } from "../../store/challenge";
import PopChallengeItem from "./PopChallengeItem";

const PopChallengeList: React.FC<{ challenges: ChallengeItemState[] }> = ({
  challenges,
}) => {
  return (
    <div>
      {challenges.map((challenge, index) => (
        <PopChallengeItem
          key={challenge.id}
          challenge={challenge}
          index={index}
        />
      ))}
    </div>
  );
};
export default PopChallengeList;
