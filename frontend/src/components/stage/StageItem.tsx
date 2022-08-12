import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { stageImgFetchAPI } from "../../lib/imgApi";
import { postListRead } from "../../lib/withTokenApi";
import { PostData } from "../../store/post";
import { setPostFormButtonState, setPostFormModalOpen } from "../../store/postModal";
import { imgState, StageState } from "../../store/stage";
import { RootState } from "../../store/store";
import Carousel from "../ui/Slider";

import styles from "./StageItem.module.scss"
import "./Carousel.module.scss"
import PostList from "../post/PostList";

const StageItem: React.FC<{
  stage: StageState, index: number
}> = ({ stage, index }) => {
  document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함

  const dispatch = useDispatch();
  const [postStageListState, setPostStageListState] = useState<PostData[]>([]);
  const [getStage, setStage] = useState<StageState>(stage);
  const isLoggedIn = useSelector((state:RootState)=> state.auth.isLoggedIn)
  const postingStageId = useSelector((state:RootState)=> state.post.postingStageId)
  const { postFormButtonOpen } = useSelector(
    (state: RootState) => state.postModal
  );

  useEffect(() => {
    stageImgFetchAPI(stage.id!)
      .then((res) => {
        setStage({ ...getStage, img: res });
      })
      .catch((err) => {
        setStage({ ...getStage, img: [] });
      });
  }, [stage, getStage]);

  useEffect(() => {
    postListRead(Number(stage.id))
      .then((res) => {
        console.log("포스팅 불러오기 성공", res);
        res.sort((a: PostData, b: PostData) =>
          a.likeNum! >= b.likeNum! ? 1 : -1
        );
        const loadedPostStageList = res.slice(0, 3);
        setPostStageListState(loadedPostStageList);
        dispatch(setPostFormButtonState(true));
      })
      .catch((err) => {
        console.log("ERR", err);
      });
    }, [dispatch, stage.id]);
    
  return (
    <div>
      <div className={styles.stageInfo}>
      <div className={styles.carouesl}>
        <Carousel>
          {/* {Array.isArray(getStage.img) &&
            getStage.img.map((img: imgState) => {
              return (
                <div>
                  <img src="https://via.placeholder.com/500x350/09f.png/fff%20C/O%20https://placeholder.com/" alt="img" />
                </div>
              );
            })} */}
          <div>
            <img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgHC4M%2FbtqBVf8rCqB%2FZz5aJuALI4JSKV8ZKAm8YK%2Fimg.jpg" alt="" />
          </div>
          <div>
            <img src="https://via.placeholder.com/500x350/" alt="" />
          </div>
          <div>
            <img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgHC4M%2FbtqBVf8rCqB%2FZz5aJuALI4JSKV8ZKAm8YK%2Fimg.jpg" alt="" />
          </div>
        </Carousel>
      </div>
        <div className={styles.content}>
          <div>{index+1}단계</div>
          <div>{stage.name}</div>
          <div>{stage.content}</div>
        </div>
      </div>
          <div className={styles.btnPosition}>
            {(postFormButtonOpen && isLoggedIn && postingStageId) && (
              <button onClick={() => dispatch(setPostFormModalOpen())}>
                완료 / 포스팅하기
              </button>
            )}
          </div>

      <div className={styles.horizon}></div>
      
      <div className={styles.postTitle}>
        <div>포스트</div>
        <Link to={`/post/${stage.id}`}>더보기</Link>
      </div>
      
      <div>
      {postStageListState && (
        <PostList posts={postStageListState} />
      )}
      </div>
    </div>
  );
};
export default StageItem;
