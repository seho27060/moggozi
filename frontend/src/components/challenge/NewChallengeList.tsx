import { ChallengeItemState } from "../../store/challenge";
import NewChallengeItem from "./NewChallengeItem";

import styles from "./NewChallengeList.module.scss";

const NewChallengeList: React.FC<{ challenges: ChallengeItemState[] }> = ({
  challenges,
}) => {
  return (
    <div>
      <div className={styles.challengeList}>
        {challenges.map((challenge) => (
          <NewChallengeItem key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};
export default NewChallengeList;
