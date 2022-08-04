import PostCommentItem from "./PostCommentItem";
import { Comment } from "../../store/comment";
//
// id == parentID => 댓글 else 대댓글
// order : 댓글 = 0, 대댓글 = 1,2,3..n
//

const PostCommentList: React.FC<{ comments: Comment[] | null }> = ({
  comments,
}) => {
  // 원댓글 추려내기
  console.log('comment',comments)
  const commentList = (comments?.filter(
    (comment) => comment.id === comment.parentId
  ))
  // 추려낸 댓글 order순으로 정렬
  commentList?.sort((a:Comment, b:Comment) => (
    (a.id > b.id) ? 1: -1
  ))
  console.log("commentlist",commentList)
  return (
    <div>
      PostComment
      {/* 원댓글만 일단 리스트 출력 */}
      {commentList?.map((comment) => (
        <PostCommentItem key={comment.id} comment ={comment}/>
      ))}
    </div>
  );
};

export default PostCommentList;
