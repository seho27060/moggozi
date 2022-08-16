import { Link, useNavigate } from "react-router-dom";
import { ChallengeItemState } from "../../store/challenge";
import HobbyList from "./HobbyList";

import no_image from "../../asset/no_image.png"
import default_profile from "../../asset/default_profile.png"
import StarsIcon from '@mui/icons-material/Stars';
import styles from "./PopChallengeItem.module.scss";

const PopChallengeItem: React.FC<{ challenge: ChallengeItemState, index: number; }> = ({
  challenge, index
}) => {
  const navigate = useNavigate();
  // 작성 중일 때 겉에서 보이게 끔 스타일링!!(등록 전인 상태 표시)
  return (
      <div style={{margin: "0 0 50px 0"}}>
          <div className={styles.rank}><div className={styles.circle}><StarsIcon /><div>{index + 1}위</div></div></div>
        <div className={styles.challengeItem}>
          <Link to={`/challenge/${challenge.id}`} className={styles.link}>
            {challenge.img ? (
              <img src={challenge.img} alt="challenge Img"></img>
            ) : (
              <img
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
            <div className={styles.header}>
              <div className={styles.title}>
                  <div onClick={() => {navigate(`/challenge/${challenge.id}`)}}>{challenge.name}</div>
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
              <div className={styles.profile} onClick={() => {navigate(`/user/${challenge.writer.id}`)}}>
                {challenge.writer.path !== "" && challenge.writer.path ? <img src={challenge.writer.path} alt="" /> : <img src={default_profile} alt="" /> }
                <div>{challenge.writer.nickname}</div>
              </div>     
            </div>


            <div className={styles.description}>{challenge.description}</div>
                    
            <div>
              <HobbyList hobbies={challenge.hobbyList} />
              <div className={styles.writer}>
                <div>♥ {challenge.likeNum}</div>
                <div>{challenge.modifiedDate?.slice(2, 10)}</div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      // {!challenge.state && <p>현재 작성 중!!</p>}
  );
};

export default PopChallengeItem;
