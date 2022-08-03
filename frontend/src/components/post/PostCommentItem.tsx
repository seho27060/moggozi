import { useSelector } from "react-redux";
import { Comment } from "../../store/comment";
import { RootState } from "../../store/store";
import PostCommentChild from "./PostCommentChild";

// 댓글 컴포넌트
// 현재 스테이트에 불러들인 comment 리스트 가져오기

const PostCommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  const commentState = useSelector((state: RootState) => state.comment.comments);

  const childComment = commentState?.filter(
    (child) => comment.id === child.parentId
  );
  // 해당 댓글의 자식 댓글 order 순으로 정렬 
  childComment?.sort((a:Comment, b:Comment)=>(
    (a.order > b.order) ? 1:-1
  ))
  return (
    <div>
      {/* 댓글내용과 해당 댓글의 대댓글 출력. */}
      {/* 사용자이미지, img태그에 null값이 못들어감 수정필요 */}
      <p>{comment.writer?.nickname}</p>
      <p>
        <div>{comment.text}</div>
        <div>{comment.createdDate?.toString()}</div>
      </p>
      <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
        {childComment?.map((child) => (
          <PostCommentChild key={child.id} child={child} />
        ))}
      </div>
    </div>
  );
};

export default PostCommentItem;
