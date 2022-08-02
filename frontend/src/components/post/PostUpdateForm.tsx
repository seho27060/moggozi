import { useRef } from "react";
import { useSelector } from "react-redux";
import { PostState } from "../../store/post";
import { RootState } from "../../store/store";
import { SendPost } from "./PostForm";

// 생성폼 -> <PostUpdateForm post = {null}/>
// 수정폼 -> <PostForm post = {수정할려는 포스트 데이터}/>

const PostUpdateForm: React.FC<{ post: PostState}> = ({ post }) => {
  console.log(post);

  const userIdState = useSelector(
    (state: RootState) => state.auth.userInfo.userId
  );

  const titleInputRef = useRef<HTMLInputElement>(
    post?.title as unknown as HTMLInputElement
  );
  const contentInputRef = useRef<HTMLTextAreaElement>(
    post?.content as unknown as HTMLTextAreaElement
  );
  const postImgInputRef = useRef<HTMLInputElement>(
    post?.img as unknown as HTMLInputElement
  );


  const PostData:SendPost = {
    memberId : userIdState, // 현재 사용자의 유저아이디 
    title : titleInputRef.current!.value,
    content : contentInputRef.current!.value,
    postImg : postImgInputRef.current?.value,
    stageId : post.stageId
  }
  const postingUpdateHandler = () => {
    // 위의 PostData를 posting 수정하기 api로 보내기
    // 요청 성공시 실행
    // 요청 실패시 실행
  }
  return(
  <div>
    <form>
      <label htmlFor="title">제목</label>
      <input type="text" id="title" ref={titleInputRef}/>
      {/* 사진 첨부 일단 text로 만듦 */}
      <label htmlFor="img">사진첨부</label>
      <input type="text" id="img" ref={postImgInputRef}/>
      <label htmlFor="content">포스팅 작성</label>
      <textarea rows={5} id="content" ref={contentInputRef}/>
      <button onClick={postingUpdateHandler}>등록하기</button>
    </form>
  </div>
  )
};
export default PostUpdateForm;
