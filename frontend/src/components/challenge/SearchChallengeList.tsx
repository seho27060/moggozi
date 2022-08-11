import { ChallengeItemState } from "../../store/challenge";
import SearchChallengeItem from "./SearchChallengeItem";

import styles from "./SearchChallengeList.module.scss"

const SearchChallengeList: React.FC<{ challenges: ChallengeItemState[], close: () => void }> = ({
  challenges, close
}) => {
  return (
    <div className={styles.challengeList}>
      {challenges.map((challenge) => (
        <SearchChallengeItem key={challenge.id} challenge={challenge} close={close} />
      ))}
    </div>
  );
};
export default SearchChallengeList;
