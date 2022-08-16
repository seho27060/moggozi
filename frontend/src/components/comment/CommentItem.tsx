import { useSelector } from "react-redux";
import { Comment } from "../../store/comment";
import { RootState } from "../../store/store";
// import CommentModifyBtn from "./CommentModifyBtn";
import OverCommentForm from "./OverCommentForm";

import CommentChild from "./CommentChild";
import CommentOptionBtn from "./CommentOptionBtn";

import styles from "./CommentItem.module.scss";
import { useState } from "react";

import { BsFillPersonFill } from "react-icons/bs";
import CommentUpdateForm from "./CommentUpdateForm";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPostModalOpen } from "../../store/postModal";

// 댓글 컴포넌트
// 현재 스테이트에 불러들인 comment 리스트 가져오기

const CommentItem: React.FC<{
  comment: Comment;
}> = ({ comment }) => {
  const postModalState = useSelector(
    (state: RootState) => state.postModal.postModalState
  );
  const comments = useSelector((state: RootState) => state.comment.comments);
  // const commentUpdateFormToggle = useSelector(
  //   (state: RootState) => state.comment.commentUpdateFormToggle
  // );
  const [commentUpdateFormToggle, setCommentUpdateFormToggle] = useState(false);
  const parentId = comment.id;

  const [toggle, setToggle] = useState(false);

  const closeToggle = () => {
    setToggle(false);
  };

  const childs = comments?.filter((comment) => comment.parentId === parentId);
  childs!.sort((a: Comment, b: Comment) => (a.id >= b.id ? 1 : -1));
  const order = Number(childs?.at(-1)?.order) + 1;
  // console.log(comment.writer?.img);
  // console.log(`${comment.id}의 childs`, childs);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toUserPageHandler = () => {
    navigate(`/user/${comment.writer!.id}`)
    dispatch(setPostModalOpen(false))
  }
  return (
    <div>
      {/* 댓글내용과 해당 댓글의 대댓글 출력. */}
      {/* 사용자이미지, img태그에 null값이 못들어감 수정필요 */}
      <div className={styles.writer}>
        <div className={styles.user}>
            {comment.writer?.path ? (
              <img
                className={styles.img}
                src={comment.writer?.path}
                alt=""
                style={{ height: "50px", width: "50px" }}
                onClick={toUserPageHandler}
              />
            ) : (
              <BsFillPersonFill
                className={styles.img}
                // src="https://blog.kakaocdn.net/dn/vckff/btqCjeJmBHM/tMVpe4aUIMfH4nKS4aO3tK/img.jpg"
                // alt=""
                style={{ height: "50px", width: "50px" }}
                onClick={toUserPageHandler}
              />
            )}
            <div>{comment.writer?.nickname}</div>
        </div>
        <div className={styles.option}>
          <CommentOptionBtn
            comment={comment}
            setCommentUpdateFormToggle={setCommentUpdateFormToggle}
          />
        </div>
      </div>
      <div>
        <div className={styles.context}>
          {!commentUpdateFormToggle ? (
            comment.text
          ) : (
            <CommentUpdateForm
              comment={comment}
              postId={postModalState.id}
              setCommentUpdateFormToggle={setCommentUpdateFormToggle}
            />
          )}
          {/* 댓글나오고 조건부로 수정폼나오도록 */}
        </div>
        <div className={styles.comment_date}>
          <div
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            댓글달기
          </div>
          <div>
            {new Date(comment!.modifiedTime!).toLocaleDateString("ko-Kr", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      <div>
        {/* 대댓글 */}
        {toggle ? (
          <OverCommentForm
            order={order}
            parentId={parentId}
            postId={postModalState.id}
            receiver={comment.writer}
            close={closeToggle}
          />
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {childs?.map((child) => (
          <div key={child.id}>
            <CommentChild child={child} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentItem;
