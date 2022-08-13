import { Link } from "react-router-dom";
import { UserChallengeType } from "../../store/userPage";

const UserChallengeItem: React.FC<{
  userChallenge: UserChallengeType;
}> = ({ userChallenge }) => {

  // const handleImgError = (e: any) => {
  //   e.target.src = "../../asset/RamG.png";
  // };

  return (
    <div >
      <Link to={`/challenge/${userChallenge.id}`} style={{textDecoration:"none"}}>
        <div
          style={{
            border: "solid 1px",
            width: "15rem",
            height: "15rem",
            margin: "2rem",
            borderRadius:"5px"
          }}
        >
          <img src={userChallenge.img!} alt="challengeImg" style={{
            width: "15rem",
            height: "12rem",
          }}/>
          <br />
          챌린지 레벨: {userChallenge.level}
          <br />
          {userChallenge.name}
        </div>
      </Link>
    </div>
  );
};

export default UserChallengeItem;
