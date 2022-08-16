import { Link } from "react-router-dom";
import { ChallengeItemState } from "../../store/challenge";
import HobbyList from "./HobbyList";

import no_image from "../../asset/no_image.png"
import styles from "./ChallengeItem.module.scss";

const ChallengeItem: React.FC<{ challenge: ChallengeItemState }> = ({
  challenge,
}) => {
  // 작성 중일 때 겉에서 보이게 끔 스타일링!!(등록 전인 상태 표시)
  return (
    <Link to={`/challenge/${challenge.id}`} className={styles.link}>
      <div className={styles.challengeItem}>
        {challenge.img !== "" && challenge.img ? (
          <img src={challenge.img} alt="challenge Img"></img>
        ) : (
          <img
            src={no_image}
            alt=""
          ></img>
        )}
        <div
          className={(() => {
            if (challenge.userProgress === 0) return styles.badge0;
            if (challenge.userProgress === 1) return styles.badge1;
            if (challenge.userProgress === 2) return styles.badge2;
          })()}
        >
          {(() => {
            if (challenge.userProgress === 0) return "";
            if (challenge.userProgress === 1) return "";
            if (challenge.userProgress === 2) return "";
          })()}
        </div>

        <div className={styles.challengeInfo}>
          <div>
            <div className={styles.title}>
              <div>{challenge.name}</div>
              <div
                className={(() => {
                  if (challenge.level === 1) return styles.level1;
                  if (challenge.level === 2) return styles.level2;
                  if (challenge.level === 3) return styles.level3;
                })()}
              >
                Lv.{challenge.level}
              </div>
            </div>

            <div className={styles.writer}>
              <div>{challenge.modifiedDate?.slice(2, 10)}</div>
              <div>{challenge.writer.nickname}</div>
              <div>♥ {challenge.likeNum}</div>
            </div>
          </div>

          <div className={styles.description}>{challenge.description}</div>

          <HobbyList hobbies={challenge.hobbyList} />
        </div>
      </div>

      {!challenge.state && <p>현재 작성 중!!</p>}
    </Link>
  );
};

export default ChallengeItem;
