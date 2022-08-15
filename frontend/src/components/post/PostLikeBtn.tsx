import { MouseEvent, useContext } from "react";
import { useSelector } from "react-redux";
import { postLike } from "../../lib/withTokenApi";
import { RootState } from "../../store/store";
import { setModalPostState } from "../../store/postModal";
import { useDispatch } from "react-redux";
import { PostData, postModify } from "../../store/post";
import { Alert } from "../../store/alert";
import { WebSocketContext } from "../../lib/WebSocketProvider";

import styles from "./PostLikeBtn.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const PostLikeBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ws = useContext(WebSocketContext);
  const postModal = useSelector((state: RootState) => state.postModal);
  const user = useSelector((state: RootState) => state.auth);

  const postLikeHandler = (event: MouseEvent) => {
    event.preventDefault();
    if (user.isLoggedIn && !postModal.postModalState.liked) {
      console.log(postModal);
      postLike(postModal.postModalState.id).then((res) => {
        console.log(
          postModal.postModalState.id,
          `${!postModal.postModalState.liked} 완료`,
          res
        );
        const modifiedModalPost: PostData = {
          id: postModal.postModalState!.id!,
          title: postModal.postModalState!.title,
          content: postModal.postModalState!.content,
          postImg: postModal.postModalState!.postImg,
          createdTime: postModal.postModalState!.createdTime,
          modifiedTime: postModal.postModalState!.modifiedTime,
          writer: postModal.postModalState!.writer,
          liked: !postModal.postModalState.liked,
          likeNum: postModal.postModalState!.likeNum! + 1,
        };
        dispatch(postModify(modifiedModalPost));
        dispatch(setModalPostState(modifiedModalPost));
        // 포스트 좋아요 알림보내기
        let jsonSend: Alert = {
          check: 0,
          createdTime: "0",
          id: "0",
          index: postModal.postModalState!.id.toString(),
          message: "post",
          receiverId: postModal.postModalState!.writer!.id!.toString(),
          receiverName: postModal.postModalState!.writer!.nickname!.toString(),
          senderId: user.userInfo.id!.toString(),
          senderName: user.userInfo.nickname!.toString(),
          type: "post",
        };
        if (postModal.postModalState!.writer!.id! !== user.userInfo.id!) {
          ws.current.send(JSON.stringify(jsonSend));
        }
      });
    } else {
      if (!user.isLoggedIn) {
        alert("로그인 후 이용 가능합니다.");
        navigate("/");
      } else {
        alert("이미 좋아요한 포스팅입니다.")
      }
    }
  };

  return (
    <div>
      <div >
        {postModal.postModalState.liked ? (
          <div className={styles.like} onClick={postLikeHandler}>
            <FavoriteIcon />
          </div>
        ) : (
          <div className={styles.unlike} onClick={postLikeHandler}>
            <FavoriteIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostLikeBtn;
