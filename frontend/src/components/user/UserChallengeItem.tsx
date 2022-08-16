import { Link } from "react-router-dom";
import { UserChallengeType } from "../../store/userPage";

import no_image from "../../asset/no_image.png";
import styles from "./UserChallengeItem.module.scss";

const UserChallengeItem: React.FC<{
  userChallenge: UserChallengeType;
  nameCheck: boolean;
}> = ({ userChallenge, nameCheck }) => {
  // const handleImgError = (e: any) => {
  //   e.target.src = "../../asset/RamG.png";
  // };

  // userChallenge.

  return (
    <div className={styles.container}>
      <Link to={`/challenge/${userChallenge.id}`} className={styles.link}>
        <div className={styles.img}>
          {userChallenge.img! !== "" && userChallenge.img! ? (
            <img src={userChallenge.img!} alt="challengeImg" />
          ) : (
            <img src={no_image} alt="" />
          )}
        </div>

        <div className={(function() {
          if(userChallenge.level === 1) return styles.level1;
          if(userChallenge.level === 2) return styles.level2;
          if(userChallenge.level === 3) return styles.level3;
        })()}></div>

        <div className={(function() {
          if (userChallenge.state === 1) return styles.badge1;
          if (userChallenge.state === 2) return styles.badge2;
        })()}></div>


          {nameCheck && (
            <div className={styles.itemTitle}>
              <div>{userChallenge.name}</div>
              </div>
          )}
      </Link>
    </div>
  );
};

export default UserChallengeItem;
