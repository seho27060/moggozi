import { Link } from "react-router-dom";
import { ChallengeItemState } from "../../store/challenge";

import styles from "./MainChallengeItem.module.scss";
import FavoriteIcon from '@mui/icons-material/Favorite';

const MainChallengeItem: React.FC<{ challenge: ChallengeItemState }> = ({
  challenge,
}) => {
  // 작성 중일 때 겉에서 보이게 끔 스타일링!!(등록 전인 상태 표시)
  return (
    <Link to={`/challenge/${challenge.id}`} className={styles.link}>
      <div className={styles.challengeItem}>
        {challenge.img ? (
          <img src={challenge.img} alt="challenge Img"></img>
        ) : (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2vD3MC0-zWEcZYdaZg3s-1fC0q9p5IMwOmA&usqp=CAU"
            alt=""
          ></img>
        )}
        {/* 진행도 뱃지 */}
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
        
        {/* 난이도 + 작성자 */}
            <div className={styles.userInfo}>
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
              <div className={styles.heart}><FavoriteIcon /><div className={styles.word}>{challenge.likeNum}</div></div>
            </div>
      </div>

      {!challenge.state && <p>현재 작성 중!!</p>}
    </Link>
  );
};

export default MainChallengeItem;
