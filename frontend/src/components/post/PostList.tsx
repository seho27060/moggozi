import { MouseEvent } from "react";
import { PostTest } from "../../store/post";

import PostItem from "./PostItem";

const PostList: React.FC<{
  posts: PostTest[] | null;
  setModalContentState: (post: PostTest) => void | null;
  openModal:()=>void |null
}> = ({ posts, setModalContentState, openModal }) => {
  return (
    <div>
      PostList
      <hr />
      {posts?.map((post) => (
        <>
          <PostItem key={post.id} post={post} />
          <button
            onClick={(event: MouseEvent) => {
              event.preventDefault();
              setModalContentState(post);
              openModal()
            }}
          >
            해당 포스팅 열기
          </button>
          <hr />
        </>
      ))}
    </div>
  );
};
export default PostList;
