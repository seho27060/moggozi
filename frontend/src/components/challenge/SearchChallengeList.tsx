import { ChallengeItemState } from "../../store/challenge";
import SearchChallengeItem from "./SearchChallengeItem";

import styles from "./SearchChallengeList.module.scss"

const SearchChallengeList: React.FC<{ challenges: ChallengeItemState[] }> = ({
  challenges,
}) => {
  return (
    <div className={styles.challengeList}>
      {challenges.map((challenge) => (
        <SearchChallengeItem key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
};
export default SearchChallengeList;
