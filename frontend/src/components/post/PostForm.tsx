import { FormEvent, useRef } from "react";
import { PostSend } from "../../store/postModal";
import { postAdd } from "../../lib/withTokenApi";
import { postRegister } from "../../store/post";
import { useDispatch } from "react-redux";
import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";

const PostForm: React.FC<{
  stageId: number;
  modalClose: () => void;
}> = ({ stageId, modalClose }) => {
  const dispatch = useDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<ReactQuill>();
  const postImgInputRef = useRef<HTMLInputElement>(null);

  const PostData: PostSend = {
    title: "",
    content: "",
    postImg: "",
    stageId: stageId,
  };
  const postingSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    PostData.title = titleInputRef.current!.value;
    PostData.content = contentInputRef.current!.value;
    PostData.postImg = postImgInputRef.current!.value;
    console.log(PostData);
    postAdd(PostData).then((res) => {
      console.log("포스팅 성공", res);
      dispatch(postRegister(res));
      modalClose();
    });
  };

  return (
    <div>
      <form style={{ width: "auto" }}>
        <div>
          <label htmlFor="title">제목</label>
          <input type="text" id="title" ref={titleInputRef} />
        </div>
        <div>
          <label htmlFor="img">사진첨부</label>
          <input type="text" id="img" ref={postImgInputRef} />
        </div>
        {/* 에디터 적용 */}
        <div>
          <EditorComponent QuillRef={contentInputRef} value={""} />
          {/* <textarea rows={5} id="content" ref={contentInputRef} /> */}
        </div>
        <button onClick={postingSubmitHandler}>등록하기</button>
      </form>
    </div>
    // 모달창으로 할지, 페이지로 할지에 따라 닫기or 뒤로가기 버튼 구현 필요
  );
};
export default PostForm;
