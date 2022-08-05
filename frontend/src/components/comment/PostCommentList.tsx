import { Comment } from "../../store/comment";
import CommentForm from "./CommentForm";
import PostCommentItem from "./PostCommentItem";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
// id == parentID => 댓글 else 대댓글
// order : 댓글 = 0, 대댓글 = 1,2,3..n

const PostCommentList: React.FC<{ comments: Comment[] | null }> = ({
  comments,
}) => {
  // 원댓글 추려내기
  console.log("comment", comments);
  const commentList = comments?.filter((comment) => comment.parentId === 0);
  commentList?.sort((a: Comment, b: Comment) => (a.id >= b.id ? 1 : -1));
  const postId = useSelector((state: RootState) => state.post.id);
  return (
    <div>
      PostComment
      <div>
        <CommentForm postId={postId} parentId={0} order={0} />
      </div>
      {commentList?.map((comment) => (
        <PostCommentItem
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
};

export default PostCommentList;
