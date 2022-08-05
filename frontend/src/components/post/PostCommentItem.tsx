import { Comment } from "../../store/comment";

import PostCommentChild from "./PostCommentChild";

// 댓글 컴포넌트
// 현재 스테이트에 불러들인 comment 리스트 가져오기

const PostCommentItem: React.FC<{
  comment: Comment;
  comments: Comment[] | null;
}> = ({ comment, comments }) => {
  const parentId = comment.parentId;
  const childs = comments?.filter((comment) => comment.parentId === parentId);
  childs?.sort((a: Comment, b: Comment) => (a.id >= b.id ? 1 : -1));
  return (
    <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
      {/* 댓글내용과 해당 댓글의 대댓글 출력. */}
      {/* 사용자이미지, img태그에 null값이 못들어감 수정필요 */}
      <p>작성자 : {comment.writer?.nickname}</p>
      <p>
        <div>{comment.text}</div>
        <div>{comment.modifiedTime?.toString()}</div>
      </p>
      <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
        {childs?.map((child) => (
          <>
            <PostCommentChild key={child.id} child={child} />
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export default PostCommentItem;
