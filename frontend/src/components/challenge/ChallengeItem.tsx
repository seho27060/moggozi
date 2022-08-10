import { Link } from "react-router-dom";
import { ChallengeItemState } from "../../store/challenge";
import HobbyList from "./HobbyList";

import styles from "./ChallengeItem.module.scss"

const ChallengeItem: React.FC<{ challenge: ChallengeItemState }> = ({
  challenge,
}) => {
  return (
    <div className={styles.challengeItem}>
      <Link to={`/challenge/${challenge.id}`}>
        <h3>챌린지 이름 : {challenge.name}</h3>
      </Link>
      <p>챌린지 소개 : {challenge.description}</p>
      <p>취미</p>
      <HobbyList hobbies={challenge.hobbyList} />
      {challenge.img && <img src={challenge.img} alt="challenge Img"></img>}
      <p>level : {challenge.level}</p>
      <p>진행도 : {challenge.userProgress}</p>
      <p>작성자 : {challenge.writer.nickname}</p>
      <p>좋아요 수 : {challenge.likeNum}</p>
    </div>
  );
};

export default ChallengeItem;
