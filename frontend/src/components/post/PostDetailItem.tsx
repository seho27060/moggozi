import { PostState } from "../../store/post";
import PostCommentList from "./PostCommentList";

const PostDetailItem: React.FC<{post: PostState}> = ({post}) =>{
  return(
    <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
      <img src="" alt="포스팅이미지/undefined로타입수정필요" />
      <p>
        <div>작성자프로필이미지 : ${post.writer.img}</div>
        <div>작성자 : ${post.writer.nickname}</div>
        <button>팔로잉/팔로우해체 버튼</button>
      </p>
      <div>
        <p>
          포스팅 내용 : ${post.content}
        </p>
        <>
          <button>좋아요버튼</button>
          좋아요갯수:{post.likeCount}
          <br />
          포스팅작성일 : {post.modifiedTime}
        </>
      </div>
      <div>
        댓글창
        // 해당 포스팅에 대한 댓글 불러온다는 가정하에 구현
        // comment store에 state 저장해서 사용할것.
        {/* <PostCommentList key={댓글 유니크아이디} comments={받은 댓글정보리스트}/> */}
      </div>
      <button>게시</button>
      <button>닫기</button>
    </div>
   
  ) 
}
export default PostDetailItem;