import { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { postSet } from "../store/post";
import PostDetailItem from "../components/post/PostDetailItem";
import PostForm from "../components/post/PostForm";
import PostList from "../components/post/PostList";
import Modal from "../components/ui/Modal";
import { commentRead, postRead } from "../lib/withTokenApi";
import { RootState } from "../store/store";
import PostUpdateForm from "../components/post/PostUpdateForm";
import {
  setPostFormModalOpen,
  setPostFormButtonState,
  setPostUpdateFormState,
  setPostModalState,
} from "../store/postModal";

const PostCommentTestPage = () => {
  document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함

  const dispatch = useDispatch();
  const postListState = useSelector((state: RootState) => state.post.posts);
  const {
    postModalOpen: postModalState,
    postFormModalOpen,
    postUpdateFormOpen: postUpdateFormState,
    postFormButtonOpen: postFormButtonState,
  } = useSelector((state: RootState) => state.postModal);
  const stageIdRef = useRef<HTMLInputElement>(null);
  const postIdRef = useRef<HTMLInputElement>(null);
  const modalPostState = useSelector((state: RootState) => state.postModal);

  const closePostModal = () => {
    dispatch(setPostModalState(false));
    dispatch(setPostUpdateFormState(false));
  };
  const closePostFormModal = () => {
    dispatch(setPostFormModalOpen());
  };

  const readStagePosts = (event: FormEvent) => {
    event.preventDefault();
    console.log(
      stageIdRef.current?.value,
      "번 스테이지의 포스팅을 불러옵니다."
    );
    postRead(Number(stageIdRef.current?.value))
      .then((res) => {
        console.log("포스팅 불러오기 성공", res);
        dispatch(postSet(res));
        dispatch(setPostFormButtonState(true));
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  const readPostComments = (event: FormEvent) => {
    event.preventDefault();
    console.log(postIdRef.current?.value, "번 포스팅의 댓글들을 불러옵니다.");
    console.log(Number(postIdRef.current?.value));
    commentRead(Number(postIdRef.current?.value))
      .then((res) => {
        console.log("댓글 불러오기 성공", res);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  return (
    <div>
      <h1>PostCommentTest</h1>
      <form>
        <label htmlFor="stageId">stage id 입력 : </label>
        <input type="text" id="stageId" ref={stageIdRef} />
        <button onClick={readStagePosts}>불러오기</button>
      </form>
      <form>
        <label htmlFor="postId">post id 입력 : </label>
        <input type="text" id="postId" ref={postIdRef} />
        <button onClick={readPostComments}>불러오기</button>
      </form>
      {postFormButtonState && (
        <button onClick={() => dispatch(setPostFormModalOpen())}>
          포스팅 생성
        </button>
      )}
      {postListState && (
        <>
          <PostList posts={postListState} />
        </>
      )}
      <div style={{ height: "200rem" }}>
        {postModalState && (
          <Modal
            open={postModalState}
            close={closePostModal}
            header="Modal heading"
          >
            {!postUpdateFormState && <PostDetailItem />}
            {postUpdateFormState && <PostUpdateForm />}
          </Modal>
        )}
        {postFormModalOpen && (
          <Modal
            open={postFormModalOpen}
            close={closePostFormModal}
            header="Modal heading"
          >
            "생성폼"
            <PostForm
              stageId={Number(stageIdRef.current!.value)}
              modalClose={closePostFormModal}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default PostCommentTestPage;
