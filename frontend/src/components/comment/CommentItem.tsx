import { useSelector } from "react-redux";
import { Comment } from "../../store/comment";
import { RootState } from "../../store/store";
// import CommentModifyBtn from "./CommentModifyBtn";
import CommentForm from "./CommentForm";

import CommentChild from "./CommentChild";
import CommentOptionBtn from "./CommentOptionBtn";

import styles from "./CommentItem.module.scss"
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
        <div>{comment.writer?.nickname}</div>
        <CommentOptionBtn comment={comment} postId={postModalState.id} />
        {/* <CommentModifyBtn comment={comment} postId={postModalState.id} /> */}
      </div>
      <div>
        <div>{comment.text}</div>
        <div>{comment.modifiedTime?.toString()}</div>
      </div>
      <div>
        {/* 대댓글 */}
        <CommentForm
          order={order}
          parentId={parentId}
          postId={postModalState.id}
          receiver={postModalState.writer}
        />
      </div>
      <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
        {childs?.map((child) => (
          <div key={child.id}>
            <CommentChild child={child} />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentItem;
