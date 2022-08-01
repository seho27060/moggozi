import { Fragment } from "react";
import { ChallengeItemState } from "../../store/challenge";
import ChallengeItem from "./ChallengeItem";

const ChallengeList: React.FC<{ challenges: ChallengeItemState[] }> = ({
  challenges,
}) => {
  return (
    <div>
      <ul>
        {challenges.map((challenge) => (
          <Fragment>
            <ChallengeItem key={challenge.id} challenge={challenge} />
          </Fragment>
        ))}
      </ul>
    </div>
  );
};
export default ChallengeList;
