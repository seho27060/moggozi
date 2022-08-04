import { PostTest } from "../../store/post";
// import PostForm from "./PostForm";

const PostItem: React.FC<{post: PostTest}> = ({post}) =>{
  return(
    <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
      <p>포스팅 작성자 : {post.writer?.nickname}</p>
      <p>포스팅 id : {post.id}</p>
      <p>포스팅 제목 : {post.title}</p>
      <p>포스팅 좋아요 수 : {post.postLikeList?.length}</p>
      <p>포스팅 이미지 : {post.postImg}</p>
      <div>
      {/* <p>포스팅 작성자 이름 : {post.writer.nickname}</p> */}
      </div>
    </div>
   
  ) 
}
export default PostItem;