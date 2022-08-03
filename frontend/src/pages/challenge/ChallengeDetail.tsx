import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HobbyList from "../../components/challenge/HobbyList";
import StageList from "../../components/stage/StageList";
import { fetchChallenge } from "../../lib/withTokenApi";
import { ChallengeDetailState } from "../../store/challenge";

const ChallengeDetail: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedChallenge, setLoadedChallenge] =
    useState<ChallengeDetailState>();
  useEffect(() => {
    setIsLoading(true);
    if (id) {
      fetchChallenge(Number(id))
        .then((res) => {
          const challenge: ChallengeDetailState = {
            ...res,
          };
          setIsLoading(false);
          setLoadedChallenge(challenge);
        })
        // console.log(res)
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [ id ]);
  return (
    <div>
      ChallengeDetail
      {isLoading === true && (
        <section>
          <p>Loading...</p>
        </section>
      )}
      {isLoading === false && (
        <div>
          <p>챌린지 name: {loadedChallenge!.name}</p>
          <p>챌린지 img: {loadedChallenge!.img}</p>
          <p>챌린지 취미들: {loadedChallenge!.name}</p>
          <p>챌린지 만든 사람: {loadedChallenge!.writer.nickname}</p>
          <p>챌린지 level: {loadedChallenge!.level}</p>
          <p>챌린지 유저 진행도: {loadedChallenge!.userProgress}</p>
          <p>챌린지 내용: {loadedChallenge!.content}</p>
          <p>챌린지 좋아요 수: {loadedChallenge!.likeNum}</p>
          <p>챌린지 취미</p>
          <HobbyList hobbies={loadedChallenge!.hobbyList} />
          <p>스테이지</p>
          <StageList stages={loadedChallenge!.stageList}/>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetail;
