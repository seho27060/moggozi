// import { useDispatch } from "react-redux"
// import { commentModify } from "../../store/comment"

import { MouseEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { commentDelete, commentUpdate } from "../../lib/withTokenApi";
import {
  Comment,
  commentModify,
  commentRemove,
  CommentSend,
} from "../../store/comment";
import { RootState } from "../../store/store";

const CommentModifyBtn: React.FC<{
  comment: Comment;
  postId: number | null;
}> = ({ comment, postId }) => {
  // 본인일시 삭제, 수정
  // 숨김 - 관리자가 숨김하는것.
  // 0(숨김), 1(활성), 2(삭제)
  // const dispatch = useDispatch()
  const [isToggle, setIsToggle] = useState(false);
  const [isFormToggle, setIsFormToggle] = useState(false);

  const enteredComment = useRef<HTMLInputElement>(null);
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);

  const dispatch = useDispatch();
  const state: number = userId === comment.writer!.id ? 1 : 0;
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
  const commentModifyHandler = (event: MouseEvent) => {
    event.preventDefault();
    commentSend.text = enteredComment.current!.value;
    commentState.text = enteredComment.current!.value;
    commentUpdate(comment.id, commentSend).then((res) => {
      dispatch(commentModify(commentState));
    });
    setIsFormToggle(!isFormToggle);
    setIsToggle(!isToggle);
  };

  const commentRemoveHandler = (event: MouseEvent) => {
    event.preventDefault();
    commentDelete(comment.id).then((res) => {
      dispatch(commentRemove(comment.id));
    });
  };

  return (
    <>
      <div style={{ border: "solid 1px" }}>
        <button onClick={(event: MouseEvent) => setIsToggle(!isToggle)}>
          ㆍㆍㆍ
        </button>
        {isToggle && (
          <div>
            {userId !== comment.writer!.id && (
              <button onClick={commentModifyHandler}>숨김</button>
            )}
          </div>
        )}
        {isToggle && (
          <div>
            {userId === comment.writer!.id && (
              <button onClick={commentRemoveHandler}>삭제</button>
            )}
          </div>
        )}
        {isToggle && (
          <div>
            {userId === comment.writer!.id && (
              <div>
                <button
                  onClick={(event: MouseEvent) =>
                    setIsFormToggle(!isFormToggle)
                  }
                >
                  {!isFormToggle && "수정"}
                </button>
                {isFormToggle && (
                  <form>
                    <button onClick={commentModifyHandler}>수정완료</button>
                    <label htmlFor="content"></label>
                    <input
                      type="text"
                      id="content"
                      ref={enteredComment}
                      defaultValue={comment.text!}
                    />
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentModifyBtn;
