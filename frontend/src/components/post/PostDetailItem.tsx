import { useEffect, useState } from "react";
import { commentRead } from "../../lib/withTokenApi";
import { Comment } from "../../store/comment";
import { PostTest } from "../../store/post";
import PostCommentList from "./PostCommentList";
import { commentSet } from "../../store/comment";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../store/store";

const PostDetailItem: React.FC<{ post: PostTest }> = ({ post }) => {
  const dispath = useDispatch()
  const [commentListState, setCommentListState] = useState<Comment[] | null>(
    null
  );
  const commentState = useSelector((state: RootState) => state.comment.comments)
  useEffect(() => {
    commentRead(post.id!)
      .then((res) => {
        console.log(`${post.id}의 댓글 ${res}`);
        setCommentListState(res);
        commentSet(res)
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }, [post.id]);
  console.log("commentSEt",commentState)
  return (
    <div>
      <div style={{ height: "25rem", overflow: "scroll" }}>
        <img src="" alt="포스팅이미지/undefined로타입수정필요" />
        <div>{post.id}</div>
        <p style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
          <div>작성자프로필이미지 : {post.writer?.img}</div>
          <div>작성자 : {post.writer?.nickname}</div>
          <button>팔로잉/팔로우해체 버튼</button>
        </p>
        <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
          <>
            <p>포스팅 내용 : {post.content}</p>
            <button>좋아요버튼</button>
            좋아요갯수:{post.postLikeList?.length}
            <br />
            포스팅작성일 :{post.modifiedTime}
          </>
        </div>
        <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
          댓글창
          {/* // 해당 포스팅에 대한 댓글 불러온다는 가정하에 구현
        // comment store에 state 저장해서 사용할것. */}
          <PostCommentList comments={commentListState} />
        </div>
        <button>게시</button>
        <button>닫기</button>
      </div>
    </div>
  );
};
export default PostDetailItem;
