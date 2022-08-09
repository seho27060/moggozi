import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ChallengeDeleteBtn from "../../components/challenge/ChallengeDeleteBtn";
import HobbyList from "../../components/challenge/HobbyList";
import PostDetailItem from "../../components/post/PostDetailItem";
import PostForm from "../../components/post/PostForm";
import PostUpdateForm from "../../components/post/PostUpdateForm";
import ReviewForm from "../../components/review/ReviewForm";
import ReviewList from "../../components/review/ReviewList";
import StageList from "../../components/stage/StageList";
import Modal from "../../components/ui/Modal";
import { fetchChallenge } from "../../lib/generalApi";
import { challengeImgFetchAPI } from "../../lib/imgApi";
import { WebSocketContext } from "../../lib/WebSocketProvider";
import { challengeLike, isLoginFetchChallenge } from "../../lib/withTokenApi";
import { Alert } from "../../store/alert";
import { ChallengeDetailState } from "../../store/challenge";
import { setPostingStageId } from "../../store/post";
import { setPostFormModalOpen, setPostModalState, setPostUpdateFormState } from "../../store/postModal";
import { reviewFetch } from "../../store/review";
import { RootState } from "../../store/store";

const ChallengeDetail: React.FC = () => {
  const { id } = useParams();
  const ws = useContext(WebSocketContext)
  
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const stageId = useSelector((state:RootState) => state.post.postingStageId)

  const [isLoading, setIsLoading] = useState(true);
  const [loadedChallenge, setLoadedChallenge] =
    useState<ChallengeDetailState>();
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.review);

  const {
    postModalOpen,
    postFormModalOpen,
    postUpdateFormOpen,
    postFormButtonOpen,
    postModalStageId,
  } = useSelector((state: RootState) => state.postModal);
  const closePostModal = () => {
    dispatch(setPostModalState(false));
    dispatch(setPostUpdateFormState(false));
  };
  const closePostFormModal = () => {
    dispatch(setPostFormModalOpen());
  };
  // 좋아요
  const likeHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    challengeLike({ challengeId: Number(id) })
      .then((res) => {
        if (!loadedChallenge!.liked){
          let jsonSend: Alert = {
            check : "0",
            createdTime : "0",
            id : "0",
            index: loadedChallenge!.id!.toString(),
            message: "challenge",
            receiverId: loadedChallenge!.writer!.id!.toString(),
            receiverName: loadedChallenge!.writer!.nickname!.toString(),
            senderId: userInfo.id!.toString(),
            senderName: userInfo.nickname!.toString(),
            type: "challenge",
          };
          if ( loadedChallenge!.writer!.id! !== userInfo.id!) {
            ws.current.send(JSON.stringify(jsonSend))
          }
        }
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

  // 페이지 데이터 받아오기
  useEffect(() => {
    setIsLoading(true);
    if (id) {
      if (isLoggedIn) {
        // 로그인 한 경우
        isLoginFetchChallenge(Number(id))
          .then((res) => {
            const challenge: ChallengeDetailState = {
              ...res,
              img: "",
            };
            setLoadedChallenge(challenge);
            // 파이어스토어에서 챌린지 사진 가져오기
            challengeImgFetchAPI(challenge.id!)
              .then((res) => {
                setLoadedChallenge({
                  ...challenge,
                  img: res,
                });
                dispatch(reviewFetch(challenge.reviewList));
                console.log("Challenge",challenge)
                let postStageId = null
                if (challenge.stageList.length !== 0){
                  postStageId = challenge.stageList[0].id
                }
                dispatch(setPostingStageId(postStageId))
              })
              .catch((err) => {
                setLoadedChallenge({
                  ...challenge,
                  img: "",
                });
                dispatch(reviewFetch(challenge.reviewList));
              });
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } else {
        // 로그인 안 한 경우
        fetchChallenge(Number(id)).then((res) => {
          const challenge: ChallengeDetailState = {
            ...res,
          };
          setLoadedChallenge(challenge);
          // 파이어스토어에서 챌린지 사진 가져오기
          challengeImgFetchAPI(challenge.id!)
            .then((res) => {
              setLoadedChallenge({
                ...challenge,
                img: res,
              });
              dispatch(reviewFetch(challenge.reviewList));
              setIsLoading(false);
            })
            .catch((err) => {
              setLoadedChallenge({
                ...challenge,
                img: "",
              });
              dispatch(reviewFetch(challenge.reviewList));
              setIsLoading(false);
            });
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
          {userInfo.id === loadedChallenge!.writer.id && (
            <div>
              <Link to={`/stage/${id}`}>
                <button>스테이지 편집</button>
              </Link>
              <Link to={`/challenge/${id}/update`} state={loadedChallenge}>
                <button>챌린지 수정</button>
              </Link>
              <ChallengeDeleteBtn />
            </div>
          )}

          {isLoggedIn && <ReviewForm />}
          <ReviewList reviews={reviews} />
        </div>
      )}
      <div>
        {postModalOpen && (
          <Modal
            open={postModalOpen}
            close={closePostModal}
            header="Modal heading"
          >
            {!postUpdateFormOpen && <PostDetailItem />}
            {postUpdateFormOpen && <PostUpdateForm />}
          </Modal>
        )}
        {postFormModalOpen && (
          <Modal
            open={postFormModalOpen}
            close={closePostFormModal}
            header="Modal heading"
          >
            "생성폼"
            {/* 스테이지 번호를 넘겨줄만한 트리거가 필요함 */}
            <PostForm
              stageId={Number(stageId)}
              modalClose={closePostFormModal}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetail;
