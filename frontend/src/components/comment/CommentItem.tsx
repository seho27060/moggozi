import { useSelector } from "react-redux";
import { Comment } from "../../store/comment";
import { RootState } from "../../store/store";
import CommentModifyBtn from "./CommentModifyBtn";
import CommentForm from "./CommentForm";

import CommentChild from "./CommentChild";

// 댓글 컴포넌트
// 현재 스테이트에 불러들인 comment 리스트 가져오기

const CommentItem: React.FC<{
  comment: Comment;
}> = ({ comment }) => {
  const postId = useSelector((state: RootState) => state.postModal.PostModalState!.id);
  const comments = useSelector((state: RootState) => state.comment.comments);
  const parentId = comment.id;

  const childs = comments?.filter((comment) => comment.parentId === parentId);
  childs!.sort((a: Comment, b: Comment) => (a.id >= b.id ? 1 : -1));
  const order = Number(childs?.at(-1)?.order) + 1;

  // console.log(`${comment.id}의 childs`, childs);
  return (
    <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
      {/* 댓글내용과 해당 댓글의 대댓글 출력. */}
      {/* 사용자이미지, img태그에 null값이 못들어감 수정필요 */}
      <div>
        작성자 : {comment.writer?.nickname}
        <CommentModifyBtn comment={comment} postId={postId}/>
      </div>
      <div>
        <div>{comment.text}</div>
        <div>{comment.modifiedTime?.toString()}</div>
      </div>
      <div>
        <CommentForm order={order} parentId={parentId} postId={postId} />
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
