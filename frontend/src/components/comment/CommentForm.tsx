import { FormEvent, useContext, useRef } from "react";
import { commentAdd, commentWriter } from "../../lib/withTokenApi";
import { CommentSend, commentRegister } from "../../store/comment";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Alert } from "../../store/alert";
import { WebSocketContext } from "../../lib/WebSocketProvider";
import { UserInfo } from "../../store/auth";
import { useNavigate } from "react-router-dom";

import styles from "./CommentForm.module.scss";

const CommentForm: React.FC<{
  postId: number | null;
  parentId: number | null;
  order: number | null;
  receiver: UserInfo | null;
}> = ({ postId, parentId, order, receiver }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth);
  const ws = useContext(WebSocketContext);

  const enteredText = useRef<HTMLTextAreaElement>(null);

  const commentSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (user.isLoggedIn) {
      const enteredComment: CommentSend = {
        postId: postId,
        text: enteredText.current!.value,
        parent: parentId,
        order: order,
        state: 1,
      };
      console.log(enteredComment);

      if (enteredComment.text!.length <= 0) {
        alert("댓글 내용을 입력해주세요.");
      } else {
        commentAdd(enteredComment)
          .then((res) => {
            console.log(`${postId}에 ${parentId} 댓글에 댓글 달기 완료`, res);
            dispatch(commentRegister(res));
            // 댓글, 대댓글 달리면 무조건 포스팅작성자에게 알림
            let jsonSend: Alert = {
              check: 0,
              createdTime: "0",
              id: "0",
              index: postId!.toString(),
              message: "comment",
              receiverId: receiver!.id!.toString(),
              receiverName: receiver!.nickname!.toString(),
              senderId: user.userInfo.id!.toString(),
              senderName: user.userInfo.nickname!.toString(),
              type: "comment",
            };
            if (receiver!.id! !== user.userInfo.id!) {
              console.log("sender",user.userInfo,"receiver",receiver)
              console.log("send msg",ws,jsonSend)
              ws.current.send(JSON.stringify(jsonSend));
            }
            // 대댓글달리면
            // 원댓글한테는 대댓글보내고
            if (parentId !== 0) {
              // 댓글 detail api 요청해서 댓글작성자에게 알림보낵,.
              commentWriter(parentId!).then((res) => {
                if (Number(res.id) !== user.userInfo.id) {
                  jsonSend = {
                    check: 0,
                    createdTime: "0",
                    id: "0",
                    index: postId!.toString(),
                    message: "reply",
                    receiverId: res!.id!.toString(),
                    receiverName: res!.nickname!.toString(),
                    senderId: user.userInfo.id!.toString(),
                    senderName: user.userInfo.nickname!.toString(),
                    type: "reply",
                  };
                  if (receiver!.id! !== user.userInfo.id!) {
                    console.log("send msg",ws,jsonSend)
                    ws.current.send(JSON.stringify(jsonSend));
                  }
                }
              });
            }
          })
          .catch((err) => {
            console.log(`comment register err ${err}`);
            navigate("/");
          });
        enteredText.current!.value = "";
        // 댓글, 대댓글 알림보내기
      }
    } else {
      alert("로그인 후 이용가능합니다.");
      navigate("/");
    }
  };

  return (
    <>
      <form className={styles.commentForm}>
        <textarea
          name="comment"
          id="comment"
          ref={enteredText}
          placeholder="댓글달기"
        ></textarea>
        {/* <input type="text" id="comment" ref={enteredText} required placeholder="댓글달기"/> */}
        <div>
          <button onClick={commentSubmitHandler}>등록</button>
        </div>
      </form>
    </>
  );
};

export default CommentForm;
