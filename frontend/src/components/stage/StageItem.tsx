import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { stageImgFetchAPI } from "../../lib/imgApi";
import {
  fetchStageProgress,
  postListRead,
  stageCancel,
  stageJoin,
} from "../../lib/withTokenApi";
import { PostData } from "../../store/post";
import {
  setPostFormButtonState,
  setPostFormModalOpen,
} from "../../store/postModal";
import { imgState, StageState } from "../../store/stage";
import { RootState } from "../../store/store";
import PostList from "../post/PostList";

import Dompurify from "dompurify";

const StageItem: React.FC<{
  stage: StageState;
  challengeProgress: number;
}> = ({ stage, challengeProgress }) => {
  document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함

  const dispatch = useDispatch();
  const [postStageListState, setPostStageListState] = useState<PostData[]>([]);
  const [getStageImg, setStageImg] = useState<imgState[]>([]);
  const [getStageProgress, setStageProgress] = useState(0);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth);
  const postingStageId = useSelector(
    (state: RootState) => state.post.postingStageId
  );
  const { postFormButtonOpen } = useSelector(
    (state: RootState) => state.postModal
  );

  // 스테이지 진행도
  useEffect(() => {
    if (isLoggedIn === true) {
      fetchStageProgress(stage.id!)
        .then((res) => {
          setStageProgress(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, stage.id]);

  // 스테이지 사진
  let postedCheck = postStageListState.some((post) => {
    return post.writer!.id !== user.userInfo.id
  })

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

  // 스테이지 도전 버튼 클릭
  const stageTryHandler = () => {
    stageJoin(stage.id!)
      .then(() => {
        alert("도전하시겠습니까?");
        setStageProgress(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 스테이지 도전 취소버튼 클릭
  const stageCancelHandler = () => {
    stageCancel(stage.id!)
      .then(() => {
        alert("취소하시겠습니까?");
        setStageProgress(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h4>스테이지 아이템</h4>
      <p>스테이지 이름 : {stage.name}</p>
      <p>
        스테이지 내용 :{" "}
        <div
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(stage.content!.toString()),
          }}
          className="view ql-editor"
        ></div>
      </p>
      <Link to={`/post/${stage.id}`}>스테이지 포스팅 더보기</Link>
      <ul>
        {Array.isArray(getStageImg) &&
          getStageImg.map((img: imgState) => {
            return (
              <li key={img.id}>
                <img src={img.url!} alt="img" />
              </li>
            );
          })}
      </ul>

      {challengeProgress === 1 && getStageProgress === 0 && (
        <button onClick={stageTryHandler}>진행하기</button>
      )}
      {challengeProgress === 1 && getStageProgress === 1 && (
        <button onClick={stageCancelHandler}>진행 취소</button>
      )}
      {getStageProgress === 2 && <p>완료</p>}
      {(getStageProgress === 1 &&
      postFormButtonOpen &&
      isLoggedIn &&
      postingStageId &&
      !postedCheck) ? (
        <button onClick={() => dispatch(setPostFormModalOpen(true))}>
          포스팅 생성
        </button>
      ) : (
        <button onClick={() => dispatch(setPostFormModalOpen(false))}>
          이미포스트작성함/ 원래있던 포스팅 띄우기
        </button>
      )}

      {postStageListState && (
        <>
          {`${stage.id}의 PostList 3개만`}
          <PostList posts={postStageListState} />
        </>
      )}
    </div>
  );
};
export default StageItem;
