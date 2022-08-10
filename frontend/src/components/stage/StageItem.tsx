import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { stageImgFetchAPI } from "../../lib/imgApi";
import { postRead } from "../../lib/withTokenApi";
import { PostData } from "../../store/post";
import { setPostFormButtonState } from "../../store/postModal";
import { imgState, StageState } from "../../store/stage";
import PostList from "../post/PostList";

const StageItem: React.FC<{
  stage: StageState;
}> = ({ stage }) => {
  document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함

  const dispatch = useDispatch();
  const [postStageListState, setPostStageListState] = useState<PostData[]>([]);

  const [getStage, setStage] = useState<StageState>(stage);
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
    postRead(Number(stage.id))
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
      <h4>스테이지 아이템</h4>
      <p>스테이지 이름 : {stage.name}</p>
      <p>스테이지 내용 : {stage.content}</p>
      <Link to={`/post/${stage.id}`}>스테이지 포스팅 더보기</Link>
      <ul>
        {Array.isArray(getStage.img) &&
          getStage.img.map((img: imgState) => {
            return (
              <li>
                <img src={img.url!} alt="img" />
              </li>
            );
          })}
      </ul>
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
