import { FormEvent, useRef, useState } from "react";
import PostList from "../components/post/PostList";
import { postRead } from "../lib/withTokenApi";

const PostCommentTestPage = () => {
  const [postState, setPostState] = useState(null);
  const stageIdRef = useRef<HTMLInputElement>(null);

  const readStagePosts = (event:FormEvent) => {
    event.preventDefault()
    console.log(stageIdRef, "번 스테이지의 포스팅을 불러옵니다.");
    postRead(Number(stageIdRef.current?.value))
      .then((res) => {
        console.log("불러오기 성공");
        setPostState(res);
        console.log("st",postState, "res",...res);
      })
      .catch((err) => {
        console.log("ERR",err);
      });
  };
  // 특정 스테이지 포스트 리스트 조회

  return (
    <div>
      <h1>PostCommentTest</h1>
      <form>
        <label htmlFor="postId">postid 입력 : </label>
        <input type="text" id="postId" ref={stageIdRef}/>
        <button onClick={readStagePosts}>불러오기</button>
        {postState && <PostList posts={postState}/>}
      </form>
    </div>
  );
};

export default PostCommentTestPage;
