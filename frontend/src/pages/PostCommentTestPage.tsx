import { FormEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PostDetailItem from "../components/post/PostDetailItem";
import PostList from "../components/post/PostList";
import Modal from "../components/ui/Modal";
import { commentRead, postRead } from "../lib/withTokenApi";
import { PostTest,  } from "../store/post";
import { RootState } from "../store/store";

const PostCommentTestPage = () => {
  const [postState, setPostState] = useState<PostTest[] | null>(null);

  const stageIdRef = useRef<HTMLInputElement>(null);
  const postIdRef = useRef<HTMLInputElement>(null);

  const [modalOpen, setModalOpen] = useState(false);
  // const [modalPostState, setModalPostState] = useState<PostTest | null>(null);
  const modalPostState = useSelector(
    (state: RootState) => state.post
  );
  
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
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
        setPostState(res);
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
      {postState && (
        <PostList
          posts={postState}
          openModal={openModal}
        />
      )}
      {/* 일단 모달자체를 누르면 사라지게 onClick={closeModal}*/}
      <div  style={{height:"200rem"}}>
        <Modal open={modalOpen} close={closeModal} header="Modal heading">
          <PostDetailItem post={modalPostState!} />
        </Modal>
      </div>
    </div>
  );
};

export default PostCommentTestPage;