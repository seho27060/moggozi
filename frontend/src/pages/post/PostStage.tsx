import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PostData, postSet } from "../../store/post";
import PostDetailItem from "../../components/post/PostDetailItem";
import PostForm from "../../components/post/PostForm";
import Modal from "../../components/ui/Modal";
import {
  postListRead,
  stageDetailRead,
  stageMyPostRead,
} from "../../lib/withTokenApi";
import { RootState } from "../../store/store";
import PostUpdateForm from "../../components/post/PostUpdateForm";
import {
  setPostFormModalOpen,
  setPostFormButtonState,
  setPostUpdateFormState,
  setPostModalOpen,
  setModalPostState,
} from "../../store/postModal";
import { useParams } from "react-router-dom";
import PostModal from "../../components/ui/PostModal";

import styles from "./PostStage.module.scss";
import { StageState } from "../../store/stage";
import PostPageList from "../../components/post/PostPageList";
import Loader from "../../components/ui/Loader";

const PostStage: React.FC = () => {
  document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함
  document.body.style.height = "auto";
  const { stageId } = useParams();

  const dispatch = useDispatch();
  const postListState = useSelector((state: RootState) => state.post.posts);
  const { postModalOpen, postFormModalOpen, postUpdateFormOpen } = useSelector(
    (state: RootState) => state.postModal
  );

  const [checkedPost, setCheckedPost] = useState<PostData | number>(-1);
  const [stageState, setStageState] = useState<StageState | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(0);

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (hasNext && Math.round(scrollTop + innerHeight) >= scrollHeight - 100) {
      setIsLoading(true);
      postListRead(Number(stageId), currentPage + 1, 18)
        .then((res) => {
          console.log("포스팅 불러오기 성공", res.content);
          dispatch(postSet(postListState.concat(res.content)));
          dispatch(setPostFormButtonState(true));
          setCurrentPage(res.pageNum);
          setHasNext(res.hasNext);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("ERR", err);
          setIsLoading(false);
        });
    }
  }, [currentPage, dispatch, stageId, postListState, hasNext]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    console.log("infinite call ver1");
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  const closePostModal = () => {
    dispatch(setPostModalOpen(false));
    dispatch(setPostUpdateFormState(false));
  };
  const closePostFormModal = () => {
    dispatch(setPostFormModalOpen(false));
  };

  useEffect(() => {
    setIsLoading(true);
    console.log(stageId, "번 스테이지의 포스팅을 불러옵니다.");
    postListRead(Number(stageId), 0, 18)
      .then((res) => {
        console.log("포스팅 불러오기 성공", res.content);
        dispatch(postSet(res.content));
        dispatch(setPostFormButtonState(true));
        setHasNext(res.hasNext);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
    stageMyPostRead(Number(stageId))
      .then((res) => {
        console.log("user stage post", res);
        setCheckedPost(res);
      })
      .catch((err) => console.log("stagepostread err", err));
    stageDetailRead(Number(stageId))
      .then((res) => {
        console.log("stage ", res);
        setStageState(res);
      })
      .catch((err) => console.log("stage err", err));
  }, [dispatch, stageId]);

  return (
    <div>
      <div className={styles.display}>
        <div className={styles.container}>
          {stageState && <h1>{stageState!.name} 스테이지의 포스팅</h1>}
          {checkedPost === -1 ? (
            <button
              onClick={() => dispatch(setPostFormModalOpen(true))}
              className={styles.postBtn}
            >
              포스팅 생성
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(setModalPostState(checkedPost));
                dispatch(setPostModalOpen(true));
              }}
              className={styles.postBtn}
            >
              내 포스팅 보기
            </button>
          )}
          {postListState && (
            <>
              <PostPageList postList={postListState} />
            </>
          )}
        </div>

        <div>
          {postModalOpen && (
            <PostModal open={postModalOpen} close={closePostModal}>
              {!postUpdateFormOpen && <PostDetailItem />}
              {postUpdateFormOpen && <PostUpdateForm />}
            </PostModal>
          )}
          {postFormModalOpen && (
            <Modal
              open={postFormModalOpen}
              close={closePostFormModal}
              header="Modal heading"
            >
              "생성폼"
              <PostForm
                stageId={Number(stageId)}
                modalClose={closePostFormModal}
                // 값이 비면 안되서 아무거나 넣었음.
                challenge={"123"}
              />
            </Modal>
          )}
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default PostStage;
