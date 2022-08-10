import { FormEvent, useContext, useRef } from "react";
import {  commentAdd } from "../../lib/withTokenApi";
import { CommentSend,commentRegister } from "../../store/comment";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Alert } from "../../store/alert";
import { WebSocketContext } from "../../lib/WebSocketProvider";
import { UserInfo } from "../../store/auth";

const CommentForm: React.FC<{
  postId: number | null;
  parentId: number | null;
  order: number | null;
  receiver : UserInfo|null
}> = ({ postId, parentId, order,receiver }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state:RootState)=> state.auth.userInfo)
  const ws = useContext(WebSocketContext)

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
      // 댓글, 대댓글 알림보내기
    if (parentId === 0 && postId === 0) {
      let jsonSend: Alert = {
        check :0,
        createdTime : "0",
        id : "0",
        index: postId.toString(),
        message: "comment",
        receiverId: receiver!.id!.toString(),
        receiverName: receiver!.nickname!.toString(),
        senderId: userInfo.id!.toString(),
        senderName: userInfo.nickname!.toString(),
        type: "comment",
      };
      if ( receiver!.id! !== userInfo.id!) {
        ws.current.send(JSON.stringify(jsonSend))
      }
      
    } else {
      let jsonSend: Alert = {
        check : 0,
        createdTime : "0",
        id : "0",
        index: postId!.toString(),
        message: "reply",
        receiverId: receiver!.id!.toString(),
        receiverName: receiver!.nickname!.toString(),
        senderId: userInfo.id!.toString(),
        senderName: userInfo.nickname!.toString(),
        type: "reply",
      };
      if ( receiver!.id! !== userInfo.id!) {
        ws.current.send(JSON.stringify(jsonSend))
      }
    }
  };

  return (
    <>
      <form>
        <label htmlFor="comment">댓글 달기</label>
        <input type="text" id="comment" ref={enteredText} required/>
        <button onClick={commentSubmitHandler}>등록</button>
      </form>
    </>
  );
};

export default CommentForm;
