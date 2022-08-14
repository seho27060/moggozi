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
            width: "13.5rem",
            height: "13.5rem",
            margin: "1rem",
            borderRadius:"5px"
          }}
        >
          <img src={userChallenge.img!} alt="challengeImg" style={{
            width: "13.5rem",
            height: "13.5rem",
          }}/>
        </div>
      </Link>
    </div>
  );
};

export default UserChallengeItem;
