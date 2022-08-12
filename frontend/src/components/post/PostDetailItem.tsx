import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { commentRead } from "../../lib/withTokenApi";
import { commentSet } from "../../store/comment";

import CommentList from "../comment/CommentList";
import { useDispatch } from "react-redux";
import PostLikeBtn from "./PostLikeBtn";
import { useNavigate } from "react-router-dom";
import { setPostModalOpen } from "../../store/postModal";

import styles from "./PostDetailItem.module.scss";
import PostOptionBtn from "./PostOptionBtn";


const PostDetailItem: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state: RootState) => state.auth.userInfo);
  const post = useSelector((state: RootState) => state.postModal);
  console.log()
  const commentState = useSelector((state: RootState) => state.comment.comments);

  console.log("postDetail", post.postModalState);
  useEffect(() => {
    commentRead(post.postModalState!.id)
      .then((res) => {
        console.log(`${post.postModalState!.id}의 댓글`);
        dispatch(commentSet(res));
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }, [dispatch, post.postModalState]);

  return (
    <div className={styles.postDetail}>
      <div>
        <img
          className={styles.img}
          src="https://blog.kakaocdn.net/dn/vckff/btqCjeJmBHM/tMVpe4aUIMfH4nKS4aO3tK/img.jpg"
          alt="포스팅이미지"
        />
        {/* 수정 버튼 */}
      </div>
      <div className={styles.container}>
        <div
          className={styles.writer}>
          <div className={styles.writerInfo}  onClick={() => {
            navigate(`/user/${post.postModalState.writer!.id}`);
            dispatch(setPostModalOpen(false));}}>
            { post.postModalState!.writer?.img ? <img src={post.postModalState!.writer?.img} alt="" /> : <img src="https://blog.kakaocdn.net/dn/vckff/btqCjeJmBHM/tMVpe4aUIMfH4nKS4aO3tK/img.jpg" alt="" />}
            
            <div>{post.postModalState!.writer?.nickname}</div>
          </div>
          <div><PostOptionBtn /></div>
        </div>

        <div className={styles.horizon} ></div>
        
        <div>
          <>
            <div className={styles.content}>{post.postModalState!.content}</div>
            {/* 좋아요 버튼 */}
            
            <div className={styles.Btn_N_Date}><div className={styles.like}><PostLikeBtn />{post.postModalState!.likeNum}</div>
            <>{String(post.postModalState.modifiedTime).slice(2, 10)}</></div>
          </>
        </div>

        <div className={styles.horizon}></div>
        <div>
          {/* // 해당 포스팅에 대한 댓글 불러온다는 가정하에 구현
          // comment store에 state 저장해서 사용할것. */}
          <CommentList comments={commentState} />
        </div>
      </div>
    </div>
  );
};
export default PostDetailItem;
