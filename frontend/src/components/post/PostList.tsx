import { postItem } from "../../store/post";
import PostItem from "./PostItem";


const PostList: React.FC<{postings: postItem[]}> = ({postings}) => {
  return (
  <div >
    PostList
    {postings.map((posting) => (
        <PostItem key={posting.id} posting = {posting}/>
    ))}
  </div>
  );
};
export default PostList;
