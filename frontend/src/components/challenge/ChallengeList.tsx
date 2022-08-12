import { ChallengeItemState } from "../../store/challenge";
import ChallengeItem from "./ChallengeItem";

import styles from "./ChallengeList.module.scss"

const ChallengeList: React.FC<{ challenges: ChallengeItemState[] }> = ({
  challenges,
}) => {
  return (
    <div className={styles.challengeList}>
      {challenges.map((challenge) => (
        <ChallengeItem key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
};
export default ChallengeList;
