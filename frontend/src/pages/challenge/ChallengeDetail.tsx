import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ChallengeDeleteBtn from "../../components/challenge/ChallengeDeleteBtn";
import HobbyList from "../../components/challenge/HobbyList";
import StageList from "../../components/stage/StageList";
import { fetchChallenge } from "../../lib/generalApi";
import { challengeLike, isLoginFetchChallenge } from "../../lib/withTokenApi";
import { ChallengeDetailState } from "../../store/challenge";
import { RootState } from "../../store/store";

const ChallengeDetail: React.FC = () => {
  const { id } = useParams();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedChallenge, setLoadedChallenge] =
    useState<ChallengeDetailState>();
  const dispatch = useDispatch();

  const likeHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    challengeLike({ challengeId: Number(id) })
      .then((res) => {
        console.log({
          ...loadedChallenge!,
          liked: !loadedChallenge!.liked,
          likeNum:
            Number(loadedChallenge!.likeNum) +
            (Number(!loadedChallenge!.liked) ? 1 : -1),
        });
        setLoadedChallenge({
          ...loadedChallenge!,
          liked: !loadedChallenge!.liked,
          likeNum:
            Number(loadedChallenge!.likeNum) +
            (Number(!loadedChallenge!.liked) ? 1 : -1),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      if (isLoggedIn) {
        // 로그인 한 경우
        isLoginFetchChallenge(Number(id))
          .then((res) => {
            console.log(res);
            const challenge: ChallengeDetailState = {
              ...res,
            };
            setIsLoading(false);
            setLoadedChallenge(challenge);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } else {
        // 로그인 안 한 경우
        fetchChallenge(Number(id))
          .then((res) => {
            console.log(res);
            const challenge: ChallengeDetailState = {
              ...res,
            };
            setIsLoading(false);
            setLoadedChallenge(challenge);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }
    }
  }, [id, isLoggedIn, dispatch]);

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
          {loadedChallenge!.img && (
            <img src={loadedChallenge!.img} alt="challenge Img"></img>
          )}
          <p>챌린지 취미들: {loadedChallenge!.name}</p>
          <p>챌린지 만든 사람: {loadedChallenge!.writer.nickname}</p>
          <p>챌린지 level: {loadedChallenge!.level}</p>
          {isLoggedIn === true && (
            <p>챌린지 유저 진행도: {loadedChallenge!.userProgress}</p>
          )}

          <p>챌린지 간단 설명: {loadedChallenge!.description}</p>
          <p>챌린지 내용: {loadedChallenge!.content}</p>
          <p>챌린지 좋아요 수: {loadedChallenge!.likeNum}</p>

          {isLoggedIn === true && loadedChallenge!.liked === false && (
            <button onClick={likeHandler}>챌린지 좋아요</button>
          )}
          {isLoggedIn === true && loadedChallenge!.liked === true && (
            <button onClick={likeHandler}>챌린지 좋아요 취소</button>
          )}

          <p>챌린지 생성일자: {loadedChallenge!.createdTime}</p>
          <p>챌린지 수정일자: {loadedChallenge!.modifiedTime}</p>
          <p>챌린지 취미</p>
          <HobbyList hobbies={loadedChallenge!.hobbyList} />
          <p>스테이지</p>
          <StageList stages={loadedChallenge!.stageList} />

          <Link to={`/stage/${id}`}>
            <button>스테이지 편집</button>
          </Link>
          <Link to={`/challenge/${id}/update`} state={loadedChallenge}>
            <button>챌린지 수정</button>
          </Link>
          {id && <ChallengeDeleteBtn />}
        </div>
      )}
    </div>
  );
};

export default ChallengeDetail;
