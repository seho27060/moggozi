import { useSelector } from "react-redux";
import { Comment } from "../../store/comment";
import { RootState } from "../../store/store";
// import CommentModifyBtn from "./CommentModifyBtn";
import OverCommentForm from "./OverCommentForm";

import CommentChild from "./CommentChild";
import CommentOptionBtn from "./CommentOptionBtn";

import styles from "./CommentItem.module.scss"
import { useState } from "react";
// 댓글 컴포넌트
// 현재 스테이트에 불러들인 comment 리스트 가져오기

const CommentItem: React.FC<{
  comment: Comment;
}> = ({ comment }) => {
  const postModalState = useSelector(
    (state: RootState) => state.postModal.postModalState
  );
  const comments = useSelector((state: RootState) => state.comment.comments);
  const parentId = comment.id;

  const [ toggle, setToggle ] = useState(false)

  const closeToggle = () => {
    setToggle(false)
  }
  

  const childs = comments?.filter((comment) => comment.parentId === parentId);
  childs!.sort((a: Comment, b: Comment) => (a.id >= b.id ? 1 : -1));
  const order = Number(childs?.at(-1)?.order) + 1;
  console.log(comment.writer?.img)
  // console.log(`${comment.id}의 childs`, childs);

  return (
    <div>
      {/* 댓글내용과 해당 댓글의 대댓글 출력. */}
      {/* 사용자이미지, img태그에 null값이 못들어감 수정필요 */}
      <div className={styles.writer}>
        <div className={styles.user}>
        { comment.writer?.path ? <img className={styles.img} src={comment.writer?.path} alt="" /> : <img className={styles.img} src="https://blog.kakaocdn.net/dn/vckff/btqCjeJmBHM/tMVpe4aUIMfH4nKS4aO3tK/img.jpg" alt="" />}
          <div>{comment.writer?.nickname}</div>
        </div>
        <div className={styles.option}><CommentOptionBtn comment={comment} postId={postModalState.id} /></div>
      </div>
      <div>
        <div className={styles.context}>{comment.text}</div>
        <div className={styles.comment_date}>
          <div onClick={() => {setToggle(!toggle)}}>댓글달기</div>
          <div>{new Date(
                    comment!.modifiedTime!
                  ).toLocaleDateString("ko-Kr", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</div>
        </div>
      </div>
      <div>
        {/* 대댓글 */}
        {toggle ? <OverCommentForm
          order={order}
          parentId={parentId}
          postId={postModalState.id}
          receiver={postModalState.writer}
          close={closeToggle}
        /> : <div></div>}
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
