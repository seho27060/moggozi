import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export interface SendPost  {
  memberId : number | null,
  title : string,
  content : string,
  stageId : number | null,
  postImg : string|undefined
}

const PostForm: React.FC<{ stageId:number }> = ({ stageId }) => {

  const userIdState = useSelector(
    (state: RootState) => state.auth.userInfo.id
  );

  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const postImgInputRef = useRef<HTMLInputElement>(null);
  

  const PostData:SendPost = {
    memberId : userIdState, // 현재 사용자의 유저아이디 
    title : titleInputRef.current!.value,
    content : contentInputRef.current!.value,
    postImg : postImgInputRef.current?.value,
    stageId : stageId
  }
  const postingSubmitHandler = () => {
    // 위의 PostData를 posting 등록하기 api로 보내기
    // 요청 성공시 실행
    // 요청 실패시 실행
  }

  return(
  <div>
    {/* 챌린지이름, 스테이지 이름 prop으로 추가로 받아오기 */}
    <form>
      <label htmlFor="title">제목</label>
      <input type="text" id="title" ref={titleInputRef}/>
      {/* 사진 첨부 일단 text로 만듦 */}
      <label htmlFor="img">사진첨부</label>
      <input type="text" id="img" ref={postImgInputRef}/>
      <label htmlFor="content">포스팅 작성</label>
      <textarea rows={5} id="content" ref={contentInputRef}/>
      <button onClick={postingSubmitHandler}>등록하기</button>
    </form>
  </div>
  // 모달창으로 할지, 페이지로 할지에 따라 닫기or 뒤로가기 버튼 구현 필요
  )
};
export default PostForm;
