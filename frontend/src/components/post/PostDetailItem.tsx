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

import PostOptionBtn from "./PostOptionBtn";
import Dompurify from "dompurify";
import styles from "./PostDetailItem.module.scss";
import "react-quill/dist/quill.snow.css";

const PostDetailItem: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const post = useSelector((state: RootState) => state.postModal);
  const commentState = useSelector(
    (state: RootState) => state.comment.comments
  );

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
          src={
            post.postModalState.postImg.length !== 0
              ? post.postModalState.postImg[0].path!
              : "https://blog.kakaocdn.net/dn/vckff/btqCjeJmBHM/tMVpe4aUIMfH4nKS4aO3tK/img.jpg"
          }
          alt="포스팅이미지"
        />
        {/* 수정 버튼 */}
      </div>
      <div className={styles.container}>
        <div className={styles.writer}>
          <div
            className={styles.writerInfo}
            onClick={() => {
              navigate(`/user/${post.postModalState.writer!.id}`);
              dispatch(setPostModalOpen(false));
            }}
          >
            {post.postModalState!.writer?.img ? (
              <img src={post.postModalState!.writer?.img} alt="" />
            ) : (
              <img
                src="https://blog.kakaocdn.net/dn/vckff/btqCjeJmBHM/tMVpe4aUIMfH4nKS4aO3tK/img.jpg"
                alt=""
              />
            )}

            <div>{post.postModalState!.writer?.nickname}</div>
          </div>
          {user.id === post.postModalState!.writer!.id && (
            <div>
              <PostOptionBtn />
            </div>
          )}
        </div>

        <div className={styles.horizon}></div>

        <div>
          <>
            {/* <div className={styles.content}>{post.postModalState!.content}</div> */}
            <div
              dangerouslySetInnerHTML={{
                __html: Dompurify.sanitize(
                  post.postModalState!.content!.toString()
                ),
              }}
              // className={styles.postDetail}
              className={`view ql-editor ${styles.content}`}
            ></div>
            {/* 좋아요 버튼 */}

            <div className={styles.Btn_N_Date}>
              <div className={styles.like}>
                <PostLikeBtn />
                {post.postModalState!.likeNum}
              </div>
              {post.postModalState!.modifiedTime! && (
                <div>
                  {new Date(
                    post.postModalState!.modifiedTime!
                  ).toLocaleDateString("ko-Kr", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
            </div>
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
