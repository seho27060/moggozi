import { Link } from "react-router-dom";
import { UserChallengeType } from "../../store/userPage";

import no_image from "../../asset/no_image.png"
import styles from "./TotalUserChallengeItem.module.scss";

const TotalUserChallengeItem: React.FC<{
  userChallenge: UserChallengeType;
  nameCheck: boolean;
}> = ({ userChallenge, nameCheck }) => {
  // const handleImgError = (e: any) => {
  //   e.target.src = "../../asset/RamG.png";
  // };

  // userChallenge.

  return (
    <div>
      <Link to={`/challenge/${userChallenge.id}`} className={styles.link}>
        <div className={styles.img}>
          { userChallenge.img! !== "" && userChallenge.img! ? <img src={userChallenge.img!} alt="challengeImg" /> :
          <img src={no_image} alt="" />}
          
        </div>
          {nameCheck && <div className={styles.itemTitle}>{userChallenge.name}</div>}
      </Link>
    </div>
  );
};

export default TotalUserChallengeItem;
