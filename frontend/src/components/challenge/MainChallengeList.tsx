import { ChallengeItemState } from "../../store/challenge";
import MainChallengeItem from "./MainChallengeItem";

import styles from "./MainChallengeList.module.scss";

const MainChallengeList: React.FC<{ challenges: ChallengeItemState[] }> = ({
  challenges,
}) => {
  return (
    <div>
      <div className={styles.challengeList}>
        {challenges.map((challenge) => (
          <MainChallengeItem key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};
export default MainChallengeList;
