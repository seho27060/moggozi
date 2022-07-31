import { ChallengeState } from "../../store/challenge";
import HobbyList from "./HobbyList";

const ChallengeItem: React.FC<{ challenge: ChallengeState }> = ({
  challenge,
}) => {
  return <li>
    <p>이름 : { challenge.name }</p>
    <p>소개 : { challenge.description }</p>
    <HobbyList hobbies= {challenge.hobbies}/>
    <p>사진 : { challenge.img }</p>
    <p>level : {challenge.level}</p>
    <p>진행도 : {challenge.user_progress}</p>
    <p>
      {challenge.writer.name}
    </p>
  </li>;
};

export default ChallengeItem;
