import { Link } from "react-router-dom";
import { ChallengeItemState } from "../../store/challenge";
import HobbyList from "./HobbyList";

const ChallengeItem: React.FC<{ challenge: ChallengeItemState }> = ({
  challenge,
}) => {
  // 작성 중일 때 겉에서 보이게 끔 스타일링!!(등록 전인 상태 표시)
  return (
    <li>
      <Link to={`/challenge/${challenge.id}`}>
        <h3>챌린지 이름 : {challenge.name}</h3>
      </Link>
      <p>챌린지 소개 : {challenge.description}</p>
      <p>취미</p>
      <HobbyList hobbies={challenge.hobbyList} />
      {challenge.img && <img src={challenge.img} alt="challenge Img"></img>}
      <p>level : {challenge.level}</p>
      <p>진행도 : {challenge.userProgress}</p>
      <p>작성자 : {challenge.writer.nickname}</p>
      <p>좋아요 수 : {challenge.likeNum}</p>
      {!challenge.state && <p>현재 작성 중!!</p>}
    </li>
  );
};

export default ChallengeItem;
