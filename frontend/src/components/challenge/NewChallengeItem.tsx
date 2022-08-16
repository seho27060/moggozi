import { Link, useNavigate } from "react-router-dom";
import { ChallengeItemState } from "../../store/challenge";
import HobbyList from "./HobbyList";

import no_image from "../../asset/no_image.png"
import default_profile from "../../asset/default_profile.png"
import styles from "./NewChallengeItem.module.scss";
import FavoriteIcon from '@mui/icons-material/Favorite';

const NewChallengeItem: React.FC<{ challenge: ChallengeItemState }> = ({
  challenge,
}) => {
  const navigate = useNavigate();
  // 작성 중일 때 겉에서 보이게 끔 스타일링!!(등록 전인 상태 표시)
  return (
    <div className={styles.sort}>
      <div className={styles.challengeItem}>

        <div className={styles.writer}>
          <div className={styles.profile} onClick={() => {navigate(`/${challenge.writer.id}`)}}>
            { challenge.writer.path !== "" && challenge.writer.path ? <img src={challenge.writer.path} alt="" /> : <img src={default_profile} alt="" />}
            
            <div>{challenge.writer.nickname}</div>
          </div>
          <div className={styles.date}>{challenge.modifiedDate?.slice(2, 10)}</div>
        </div>

        <Link to={`/challenge/${challenge.id}`}>
          {challenge.img ? (
            <img className={styles.img} src={challenge.img} alt="challenge Img"></img>
          ) : (
            <img className={styles.img}
              src={no_image}
              alt=""
            ></img>
          )}
        </Link>

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
          </div>
          <div className={styles.description}>{challenge.description}</div>
          
          <div className={styles.tags}>
            <HobbyList hobbies={challenge.hobbyList} />
            <div className={styles.favorite}><FavoriteIcon /><div>{challenge.likeNum}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChallengeItem;
