import { ChallengeItemState } from "../../store/challenge";
import MainRecomChallengeItem from "./MainRecomChallengeItem";

import styles from "./MainRecomChallengeList.module.scss";

const MainRecomChallengeList: React.FC<{
  challenges: ChallengeItemState[];
}> = ({ challenges }) => {
  return (
    <div>
      <div className={styles.challengeList}>
        {challenges.map((challenge) => (
          <MainRecomChallengeItem key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};
export default MainRecomChallengeList;
