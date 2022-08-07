import { FormEvent, useRef } from "react";
import { commentAdd } from "../../lib/withTokenApi";
import { CommentSend,commentRegister } from "../../store/comment";
import { useDispatch } from "react-redux";

const CommentForm: React.FC<{
  postId: number | null;
  parentId: number | null;
  order: number | null;
}> = ({ postId, parentId, order }) => {
  const dispatch = useDispatch();

  const enteredText = useRef<HTMLInputElement>(null);

  const commentSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    const enteredComment: CommentSend = {
      postId: postId,
      text: enteredText.current!.value,
      parent: parentId,
      order: order,
      state: 1,
    };
    commentAdd(enteredComment)
      .then((res) => {
        console.log(`${postId}에 ${parentId} 댓글에 댓글 달기 완료`, res);
        dispatch(commentRegister(res));
      })
      .catch((err) => {
        alert(`comment register err ${err}`);
      });
      enteredText.current!.value = ""
  };

  return (
    <div>
      댓글 달기
      <form>
        <label htmlFor="comment"></label>
        <input type="text" id="comment" ref={enteredText} />
        <button onClick={commentSubmitHandler}>등록</button>
      </form>
    </div>
  );
};

export default CommentForm;
