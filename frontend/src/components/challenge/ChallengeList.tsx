import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChallengeState } from "../../store/challenge";
import ChallengeItem from "./ChallengeItem";

const ChallengeList: React.FC<{ challenges: ChallengeState[] }> = ({
  challenges,
}) => {
  return (
    <div>
      <ul>
        {challenges.map((challenge) => (
          <Fragment>
            <Link to={"/"}>
              <ChallengeItem key={challenge.id} challenge={challenge} />
            </Link>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};
export default ChallengeList;
