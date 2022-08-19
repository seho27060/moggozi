import { Comment } from "../../store/comment";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
// id == parentID => 댓글 else 대댓글
// order : 댓글 = 0, 대댓글 = 1,2,3..n

import styles from "./CommentList.module.scss";

const CommentList: React.FC<{ comments: Comment[] | null }> = ({
  comments,
}) => {
  // 원댓글 추려내기
  // console.log("comment", comments);
  const commentList = comments?.filter((comment) => comment.parentId === 0);
  commentList?.sort((a: Comment, b: Comment) => (a.id >= b.id ? 1 : -1));
  const postModalState = useSelector(
    (state: RootState) => state.postModal.postModalState
  );

  return (
    <div>
      {commentList?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
      <div className={styles.commentForm}>
        {/* 원댓글 */}
        <CommentForm
          postId={postModalState.id}
          parentId={0}
          order={0}
          receiver={postModalState.writer}
        />
      </div>
    </div>
  );
};

export default CommentList;
