import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchChallenge } from "../../lib/generalApi";
import { WebSocketContext } from "../../lib/WebSocketProvider";
import {
  cancelChallenge,
  challengeLike,
  isLoginFetchChallenge,
  registerChallenge,
  tryChallenge,
} from "../../lib/withTokenApi";
import { Alert } from "../../store/alert";
import { ChallengeDetailState } from "../../store/challenge";
import { setPostingStageId } from "../../store/post";
import {
  setPostFormModalOpen,
  setPostModalOpen,
  setPostUpdateFormState,
} from "../../store/postModal";
import { reviewFetch } from "../../store/review";
import { RootState } from "../../store/store";
import moment from "moment";

import ChallengeDeleteBtn from "../../components/challenge/ChallengeDeleteBtn";
import HobbyList from "../../components/challenge/HobbyList";
import PostDetailItem from "../../components/post/PostDetailItem";
import PostForm from "../../components/post/PostForm";
import PostUpdateForm from "../../components/post/PostUpdateForm";
import ReviewForm from "../../components/review/ReviewForm";
import ReviewList from "../../components/review/ReviewList";
import StageList from "../../components/stage/StageList";

import Dompurify from "dompurify";
import styles from "./ChallengeDetail.module.scss";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PostModal from "../../components/ui/PostModal";
import PostFormModal from "../../components/ui/PostFormModal";

const ChallengeDetail: React.FC = () => {
  const navigate = useNavigate()
  
  const { id } = useParams();
  const ws = useContext(WebSocketContext);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const stageId = useSelector((state: RootState) => state.post.postingStageId);
  const userImg = useSelector((state: RootState) => state.auth.userInfo.img);

  const [isLoading, setIsLoading] = useState(true);
  const [loadedChallenge, setLoadedChallenge] =
    useState<ChallengeDetailState>();
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.review);

  const { postModalOpen, postFormModalOpen, postUpdateFormOpen } = useSelector(
    (state: RootState) => state.postModal
  );

  const closePostModal = () => {
    dispatch(setPostModalOpen(false));
    dispatch(setPostUpdateFormState(false));
  };

  const closePostFormModal = () => {
    dispatch(setPostFormModalOpen(false));
  };

  // 챌린지 등록
  const registerHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (
      window.confirm("챌린지 등록하시겠습니까? 등록하면 취소할 수 없습니다!")
    ) {
      registerChallenge(Number(id))
        .then((res) =>
          setLoadedChallenge({
            ...loadedChallenge!,
            state: 1,
          })
        )
        .catch((err) => console.log(err));
    }
  };

  // 좋아요
  const likeHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    challengeLike({ challengeId: Number(id) })
      .then((res) => {
        if (!loadedChallenge!.liked) {
          let jsonSend: Alert = {
            check: 0,
            createdTime: "0",
            id: "0",
            index: loadedChallenge!.id!.toString(),
            message: "challenge",
            receiverId: loadedChallenge!.writer!.id!.toString(),
            receiverName: loadedChallenge!.writer!.nickname!.toString(),
            senderId: userInfo.id!.toString(),
            senderName: userInfo.nickname!.toString(),
            type: "challenge",
          };
          if (loadedChallenge!.writer!.id! !== userInfo.id!) {
            ws.current.send(JSON.stringify(jsonSend));
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
  // 챌린지 도전
  const startHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (window.confirm("정말 도전하시겠습니까?")) {
      tryChallenge(userInfo.id!, loadedChallenge!.id!).then((res) => {
        alert("챌린지 도전 완료!");
      });
    }
  };
  // 챌린지 도전 취소
  const cancelHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (window.confirm("도전 취소하시겠습니까?")) {
      cancelChallenge(loadedChallenge!.id!).then((res) => {
        alert("챌린지 도전 취소 완료");
      });
    }
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
            };
            setLoadedChallenge(challenge);

            dispatch(reviewFetch(challenge.reviewList));
            let postStageId = null;
            if (challenge.stageList.length !== 0) {
              postStageId = challenge.stageList[0].id;
            }
            dispatch(setPostingStageId(postStageId));

            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } else {
        // 로그인 안 한 경우
        fetchChallenge(Number(id))
          .then((res) => {
            const challenge: ChallengeDetailState = {
              ...res,
            };
            setLoadedChallenge(challenge);

            dispatch(reviewFetch(challenge.reviewList));
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }
    }
  }, [id, isLoggedIn, dispatch]);

  return (
    <div className={styles.main}>
      {isLoading === true && (
        <section>
          <p>Loading...</p>
        </section>
      )}
      {isLoading === false && (
        <div className={styles.container}>
          <div className={styles.C_article}>
            <div className={styles.title}>
              <div style={{ alignItems: "center" }}>
                <div className={styles.name}>{loadedChallenge!.name}</div>
                {(() => {
                  if (loadedChallenge!.level === 1)
                    return (
                      <div className={styles.level1}>
                        Lv.{loadedChallenge!.level}
                      </div>
                    );
                  if (loadedChallenge!.level === 2)
                    return (
                      <div className={styles.level2}>
                        Lv.{loadedChallenge!.level}
                      </div>
                    );
                  if (loadedChallenge!.level === 3)
                    return (
                      <div className={styles.level3}>
                        Lv.{loadedChallenge!.level}
                      </div>
                    );
                  if (loadedChallenge!.level === 4)
                    return (
                      <div className={styles.level3}>
                        Lv.{loadedChallenge!.level}
                      </div>
                    );
                })()}

              </div>
              {userInfo.id === loadedChallenge!.writer.id &&
                loadedChallenge!.state === 0 && (
                  <div>
                    <button onClick={registerHandler}>챌린지 등록</button>
                  </div>
                )}
              <div>
                {loadedChallenge!.writer.id === userInfo.id ? (
                  <div>
                    {userInfo.id === loadedChallenge!.writer.id && (
                      <div>
                        <Link to={`/stage/${id}`}>
                          <button>스테이지 편집</button>
                        </Link>
                        <Link
                          to={`/challenge/${id}/update`}
                          state={loadedChallenge}
                        >
                          <button>챌린지 수정</button>
                        </Link>
                        <ChallengeDeleteBtn />
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className={styles.writer} onClick={() => {navigate(`/user/${loadedChallenge!.writer.id}`)}}>
                      <img src={loadedChallenge!.writer.img} alt="" />
                      <div>
                        <div className={styles.user}>
                          {loadedChallenge!.writer.nickname}
                        </div>
                        {moment(
                          loadedChallenge!.createdTime?.slice(2, 10)
                        ).isBefore(
                          loadedChallenge!.modifiedTime?.slice(2, 10)
                        ) ? (
                          <div className={styles.date}>
                            {loadedChallenge!.modifiedTime?.slice(2, 10)}
                          </div>
                        ) : (
                          <div className={styles.date}>
                            {loadedChallenge!.createdTime?.slice(2, 10)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {loadedChallenge!.img === '""' ? (
              <img
                className={styles.challengeImg}
                src="https://via.placeholder.com/1000x450.png/"
                alt=""
              />
            ) : (
              <img
                className={styles.challengeImg}
                src={loadedChallenge!.img!}
                alt="challenge Img"
              />
            )}
            <div className={styles.tag_start}>
              <HobbyList hobbies={loadedChallenge!.hobbyList} />
              {isLoggedIn === true && (
                  <div>
                    {loadedChallenge!.userProgress === 0 && (
                      <button className={styles.button} onClick={startHandler}>도전</button>
                    )}
                    {loadedChallenge!.userProgress === 1 && (
                      <button className={styles.button} onClick={cancelHandler}>도전 취소</button>
                    )}
                    {loadedChallenge!.userProgress === 2 && <button className={styles.complete}>완료</button>}
                  </div>
                )}
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: Dompurify.sanitize(
                  loadedChallenge!.content!.toString()
                ),
              }}
              className="view ql-editor"
            ></div>

            <div className={styles.writer} onClick={() => {navigate(`/user/${loadedChallenge!.writer.id!}`)}} >
              <img src={loadedChallenge!.writer.img} alt="" />
              <div className={styles.user}>
                {loadedChallenge!.writer.nickname}
              </div>
            </div>

            <div className={styles.like}>
              <div className={styles.likeLabel} onClick={likeHandler}>
                {isLoggedIn === true && loadedChallenge!.liked === false && (
                  <div className={styles.heart}><FavoriteIcon /></div>
                  // 챌린지 좋아요
                )}
                {isLoggedIn === true && loadedChallenge!.liked === true && (
                  <div className={styles.nonHeart}><FavoriteIcon /></div>
                  // 챌린지좋아요 취소
                )}{" "}
                좋아요 <div className={styles.likeCnt}>{loadedChallenge!.likeNum}</div>
              </div>
              <div className={styles.commentCnt}>
                <div>댓글 </div><div>{reviews.length}</div>
              </div>
            </div>

            <div></div>
          </div>
          <div className={styles.horizon}></div>

          <div>{isLoggedIn && <ReviewForm user_image={userImg} />}</div>
          <ReviewList reviews={reviews} />

          <div>
            <div className={styles.stageHr}></div>
            <StageList
              stages={loadedChallenge!.stageList}
              challengeProgress={loadedChallenge!.userProgress}
            />
          </div>
        </div>
      )}

      <div>
        {postModalOpen && (
          <PostModal open={postModalOpen} close={closePostModal}>
            {!postUpdateFormOpen && <PostDetailItem />}
            {postUpdateFormOpen && <PostUpdateForm />}
          </PostModal>
        )}

        {postFormModalOpen && (
          <PostFormModal
            open={postFormModalOpen}
            close={closePostFormModal}
          >
            <PostForm
              stageId={Number(stageId)}
              modalClose={closePostFormModal}
              challenge={loadedChallenge?.name!}
              // stage={}
            />
          </PostFormModal>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetail;
