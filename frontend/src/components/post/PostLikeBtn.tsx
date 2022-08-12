import { MouseEvent, useContext } from "react";
import { useSelector } from "react-redux";
import {  postLike } from "../../lib/withTokenApi";
import { RootState } from "../../store/store";
import { setModalPostState } from "../../store/postModal";
import { useDispatch } from "react-redux";
import { PostData, postModify } from "../../store/post";
import { Alert } from "../../store/alert";
import { WebSocketContext } from "../../lib/WebSocketProvider";

import styles from "./PostLikeBtn.module.scss"
import FavoriteIcon from '@mui/icons-material/Favorite';

const PostLikeBtn = () => {
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext)
  const postModal = useSelector((state: RootState) => state.postModal);
  const liked = postModal.postModalState.liked;
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  let likeNum = postModal.postModalState.likeNum!;

  const postLikeHandler = (event: MouseEvent) => {
    if (userInfo.id) {
      if (liked) {
        likeNum -= 1;
      } else {
        likeNum += 1;
      }
      event.preventDefault();
      console.log(postModal);
      postLike(postModal.postModalState.id).then((res) => {
        console.log(postModal.postModalState.id, `${!liked} 완료`, res);
        const modifiedModalPost: PostData = {
          id: postModal.postModalState!.id!,
          title: postModal.postModalState!.title,
          content: postModal.postModalState!.content,
          postImg: postModal.postModalState!.postImg,
          createdTime: postModal.postModalState!.createdTime,
          modifiedTime: postModal.postModalState!.modifiedTime,
          writer: postModal.postModalState!.writer,
          liked: !liked,
          likeNum: likeNum,
        };
        dispatch(postModify(modifiedModalPost));
        dispatch(setModalPostState(modifiedModalPost));
        // 포스트 좋아요 알림보내기
        let jsonSend: Alert = {
          check : 0,
          createdTime : "0",
          id : "0",
          index: postModal.postModalState!.id.toString(),
          message: "post",
          receiverId: postModal.postModalState!.writer!.id!.toString(),
          receiverName: postModal.postModalState!.writer!.nickname!.toString(),
          senderId: userInfo.id!.toString(),
          senderName: userInfo.nickname!.toString(),
          type: "post",
        };
        if ( postModal.postModalState!.writer!.id! !== userInfo.id! && !liked) {
          ws.current.send(JSON.stringify(jsonSend))
        }
      });
    }
  };

  return (
    <div>
      <div onClick={postLikeHandler}>{liked ? <div className={styles.like}><FavoriteIcon /></div> : <div className={styles.unlike}><FavoriteIcon /></div>}</div>
    </div>
  );
};

export default PostLikeBtn;
