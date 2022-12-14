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
import no_image from "../../asset/no_image.png";
import Dompurify from "dompurify";
import { Skeleton } from "@mui/material";

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
  const [isLoading, setIsLoading] = useState(true);

  // 스테이지 사진
  useEffect(() => {
    setIsLoading(true);
    stageImgFetchAPI(stage.id!)
      .then((res) => {
        setStageImg(res);
        setTimeout(() => setIsLoading(false), 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stage.id]);

  // 포스트 리스트
  useEffect(() => {
    postListRead(Number(stage.id), 0, 3)
      .then((res) => {
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
  }, [dispatch, stage.id]);

  return (
    <div>
      <div className={styles.stageInfo}>
        <div className={styles.carousel}>
          {isLoading ? (
            <Skeleton
              style={{ bottom: 130 }}
              width={500}
              height={600}
              animation="wave"
            />
          ) : (
            <Carousel>
              {Array.isArray(getStageImg) && getStageImg.length !== 0 ? (
                getStageImg.map((img) => {
                  return <img key={img.id!} src={img.url!} alt="" />;
                })
              ) : (
                <img src={no_image} alt="" />
              )}
            </Carousel>
          )}
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
