import { posting } from "../../store/post";
import PostItem from "./PostItem";


const PostList: React.FC<{postings: posting[] | null}> = ({postings}) => {
  return (
  <div >
    PostList
    {postings?.map((posting) => (
        <PostItem key={posting.id} posting = {posting}/>
    ))}
  </div>
  );
};
export default PostList;
