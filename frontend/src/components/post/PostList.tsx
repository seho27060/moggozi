import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import PostItem from "./PostItem";
import { setModalPostState, setPostModalState } from "../../store/postModal";
import { PostTest } from "../../store/post";

const PostList: React.FC<{
  posts: PostTest[] | null;
}> = ({ posts }) => {
  const dispatch = useDispatch();
  const postList = [...posts!];
  postList!.sort((a: PostTest, b: PostTest) => (a.id >= b.id ? 1 : -1));

  console.log("postlist", postList);

  return (
    <div>
      <hr />
      PostList
      {postList!.map((post) => (
        <div key={post.id}>
          <PostItem post={post} />
          <button
            onClick={(event: MouseEvent) => {
              event.preventDefault();
              dispatch(setModalPostState(post));
              dispatch(setPostModalState(true))
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
