import { Link } from "react-router-dom";
import { UserChallengeType } from "../../store/userPage";

import styles from "./UserChallengeItem.module.scss"

const UserChallengeItem: React.FC<{
  userChallenge: UserChallengeType;
}> = ({ userChallenge }) => {

  // const handleImgError = (e: any) => {
  //   e.target.src = "../../asset/RamG.png";
  // };

  return (
    <div >
      <Link to={`/challenge/${userChallenge.id}`} className={styles.link} >
        <div className={styles.img}>
          <img src={userChallenge.img!} alt="challengeImg" />
        </div>
      </Link>
    </div>
  );
};

export default UserChallengeItem;
