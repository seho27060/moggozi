import { MouseEvent } from "react";
import { PostTest, setModalPostState } from "../../store/post";
import { useDispatch } from "react-redux";

import PostItem from "./PostItem";

const PostList: React.FC<{
  posts: PostTest[] | null;
  openModal:()=>void |null
}> = ({ posts, openModal }) => {
  const dispatch = useDispatch()
  
  return (
    <div>
      PostList
      <hr />
      {posts?.map((post) => (
        <div key={post.id}>
          <PostItem  post={post} />
          <button
            onClick={(event: MouseEvent) => {
              event.preventDefault();
              dispatch(setModalPostState(post));
              openModal()
            }}
          >
            해당 포스팅 열기
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};
export default PostList;
