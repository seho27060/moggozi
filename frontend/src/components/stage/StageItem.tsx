import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { stageImgFetchAPI } from "../../lib/imgApi";
import { postListRead, stageMyPostRead } from "../../lib/withTokenApi";
import { postSet, setCheckedPost } from "../../store/post";
import {
  setModalPostState,
  setPostFormButtonState,
  setPostFormModalOpen,
  setPostModalOpen,
} from "../../store/postModal";
import { imgState, StageState } from "../../store/stage";
import { RootState } from "../../store/store";
import Carousel from "../ui/Slider";

import styles from "./StageItem.module.scss";
import "./Carousel.module.scss";
import PostList from "../post/PostList";

import Dompurify from "dompurify";

const StageItem: React.FC<{
  stage: StageState;
  index: number;
  challengeProgress: number;
  challengeState: number;
}> = ({ stage, index, challengeProgress, challengeState }) => {
  document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함

  const dispatch = useDispatch();
  const postStageListState = useSelector(
    (state: RootState) => state.post.posts
  );
  const [getStageImg, setStageImg] = useState<imgState[]>([]);
  const checkedPost = useSelector((state: RootState) => state.post.checkedPost);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const postingStageId = useSelector(
    (state: RootState) => state.post.postingStageId
  );
  const { postFormButtonOpen } = useSelector(
    (state: RootState) => state.postModal
  );

  // 스테이지 사진
  useEffect(() => {
    stageImgFetchAPI(stage.id!)
      .then((res) => {
        setStageImg(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stage.id]);

  // 포스트 리스트
  useEffect(() => {
    postListRead(Number(stage.id), 0, 3)
      .then((res) => {
        // setPostStageListState(res.content);
        dispatch(postSet(res.content));
        dispatch(setPostFormButtonState(true));
      })
      .catch((err) => {
        console.log("ERR", err);
      });
    stageMyPostRead(Number(stage.id))
      .then((res) => {
        dispatch(setCheckedPost(res));
      })
      .catch((err) => console.log("err", err));
  }, [dispatch, stage.id, setCheckedPost]);

  return (
    <div>
      <div className={styles.stageInfo}>
        <div className={styles.carousel}>
          <Carousel>
            {/* 여기서 map으로 div태그 안에 이미지 출력하면 된다. 밑의 3개는 임시 사진.*/}
            {Array.isArray(getStageImg) && getStageImg.length !== 0 ? (
              getStageImg.map((img) => {
                return <img key={img.id!} src={img.url!} alt="" />;
              })
            ) : (
              <img
                src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgHC4M%2FbtqBVf8rCqB%2FZz5aJuALI4JSKV8ZKAm8YK%2Fimg.jpg"
                alt=""
              />
            )}
          </Carousel>
        </div>
        <div className={styles.content}>
          <div>{index + 1}단계</div>
          <div>{stage.name}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(stage.content!.toString()),
            }}
            className="view ql-editor"
          ></div>
        </div>
      </div>
      <div className={styles.btnPosition}>
        {/* 챌린지를 도전해야 포스팅 CRUD 가능 */}
        {challengeProgress !== 0 &&
          postFormButtonOpen &&
          isLoggedIn &&
          postingStageId && (
            <div>
              {checkedPost === -1 ? (
                // 포스팅 모달 연결해야한다.
                <button
                  onClick={() => {
                    dispatch(setPostFormModalOpen(true));
                  }}
                >
                  포스팅하기
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch(setModalPostState(checkedPost));
                    dispatch(setPostModalOpen(true));
                  }}
                >
                  내 포스팅 보기
                </button>
              )}
            </div>
          )}
      </div>
      {challengeState === 1 && (
        <div>
          <div className={styles.horizon}></div>

          <div className={styles.postTitle}>
            <div>포스트</div>
            <Link to={`/post/${stage.id}`}>더보기</Link>
          </div>

          <div>
            {postStageListState && <PostList posts={postStageListState} />}
          </div>
        </div>
      )}
    </div>
  );
};
export default StageItem;
