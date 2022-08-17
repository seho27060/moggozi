import { ChallengeItemState } from "../../store/challenge";
import MainPopChallengeItem from "./MainPopChallengeItem";

import FadeSlider from "../ui/FadeSlider";

const MainPopChallengeList: React.FC<{ challenges: ChallengeItemState[] }> = ({
  challenges,
}) => {
  return (
    <div>
      {/* <div 
    className={styles.challengeList}
    > */}

      <FadeSlider>
        {challenges.map((challenge) => (
          <MainPopChallengeItem key={challenge.id} challenge={challenge} />
        ))}
      </FadeSlider>

      {/* </div> */}
    </div>
  );
};
export default MainPopChallengeList;
