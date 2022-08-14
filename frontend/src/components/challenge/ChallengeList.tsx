import { ChallengeItemState } from "../../store/challenge";
import ChallengeItem from "./ChallengeItem";

import styles from "./ChallengeList.module.scss"

const ChallengeList: React.FC<{ challenges: ChallengeItemState[] }> = ({
  challenges,
}) => {
  console.log(challenges)
  return (
    <div>
    <div className={styles.challengeList}>
      {challenges.map((challenge) => (
        <ChallengeItem key={challenge.id} challenge={challenge} />
      ))}
    </div>
    
    {challenges.length === 0 && <div className={styles.noChallengeList}><div>검색 결과가 존재하지 않습니다.</div></div>}

    </div>
  );
};
export default ChallengeList;
