import { PostTest } from "../../store/post";
import PostItem from "./PostItem";


const PostList: React.FC<{posts: PostTest[] | null}> = ({posts}) => {
  return (
  <div >
    PostList
    {posts?.map((post) => (
        <PostItem key={post.id} post = {post}/>
    ))}
  </div>
  );
};
export default PostList;
