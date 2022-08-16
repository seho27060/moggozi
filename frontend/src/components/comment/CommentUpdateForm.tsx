import { Dispatch, FormEvent, SetStateAction, useRef } from "react";
import { commentUpdate } from "../../lib/withTokenApi";
import { CommentSend, Comment, commentModify } from "../../store/comment";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import styles from "./CommentUpdateForm.module.scss";

const CommentUpdateForm: React.FC<{
  comment: Comment;
  postId: number | null;
  setCommentUpdateFormToggle: Dispatch<SetStateAction<boolean>>;
}> = ({ comment, postId, setCommentUpdateFormToggle }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);
  const enteredComment = useRef<HTMLInputElement>(null);

  const state: number = user.userInfo.id === comment.writer!.id ? 1 : 0;
  let commentSend: CommentSend = {
    postId: postId,
    text: null,
    parent: comment.parentId,
    order: comment.order,
    state: state,
  };
  let commentState: Comment = {
    createdTime: comment.createdTime,
    id: comment.id,
    state: comment.state,
    order: comment.order,
    parentId: comment.parentId,
    text: comment.text,
    writer: comment.writer,
    modifiedTime: comment.modifiedTime,
  };
  const commentModifyHandler = (event: FormEvent) => {
    event.preventDefault();
    if (window.confirm("수정하시겠습니까?")) {
      commentSend.text = enteredComment.current!.value;
      commentState.text = enteredComment.current!.value;
      commentUpdate(comment.id, commentSend).then((res) => {
        console.log("comment 수정완료", res);
        dispatch(commentModify(commentState));
      });
      setCommentUpdateFormToggle(false);
    }
  };

  return (
    <div className={styles.commentUpdateContainer}>
      <form>
        <label htmlFor="content"></label>
        <input
          type="text"
          id="content"
          ref={enteredComment}
          defaultValue={comment.text!}
        />
        <button
          onClick={commentModifyHandler}
          style={{ width: "3.3rem", padding: "0" }}
        >
          수정완료
        </button>
      </form>
    </div>
  );
};

export default CommentUpdateForm;
