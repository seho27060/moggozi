// import { useDispatch } from "react-redux"
// import { commentModify } from "../../store/comment"

import { MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { commentUpdate } from "../../lib/withTokenApi";
import { Comment, commentModify } from "../../store/comment";
import { RootState } from "../../store/store";

const CommentModifyBtn: React.FC<{ comment: Comment }> = ({ comment }) => {
  // 본인일시 삭제, 수정
  // 타인일시 숨김\
  // 0(숨김), 1(활성), 2(삭제)
  // const dispatch = useDispatch()
  const [isToggle, setIsToggle] = useState(false);
  const [isFormToggle, setIsFormToggle] = useState(false);
  const [modifiedComment, setModifiedComment] = useState<Comment | null>(null);
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);
  const state: Number = userId === comment.writer!.id ? 2 : 0;
  const commentModifyHandler = (event: MouseEvent) =>
    event.preventDefault();
    // commentUpdate(comment.id,)

  return (
    <div style={{ border: "solid 1px" }}>
      <button onClick={(event: MouseEvent) => setIsToggle(!isToggle)}>
        ...
      </button>
      {isToggle && (
        <>
          {userId !== comment.writer!.id && (
            <button onClick={commentModifyHandler}>숨김</button>
          )}
        </>
      )}
      {isToggle && (
        <>{userId === comment.writer!.id && <button>삭제</button>}</>
      )}
      {isToggle && (
        <>
          {userId === comment.writer!.id && (
            <button
              onClick={(event: MouseEvent) => setIsFormToggle(!isFormToggle)}
            >
              수정
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CommentModifyBtn;
