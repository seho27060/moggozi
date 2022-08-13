import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { PostSend } from "../../store/postModal";
import { postAdd, postUpdate } from "../../lib/withTokenApi";
import { postRegister } from "../../store/post";
import { useDispatch } from "react-redux";
import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageService } from "../../fbase/fbase";

const PostForm: React.FC<{
  stageId: number;
  modalClose: () => void;
}> = ({ stageId, modalClose }) => {
  const dispatch = useDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<ReactQuill>();

  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const [fileName, setFileName] = useState("");

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
    console.log(PostData);
    postAdd(PostData)
      .then((res) => {
        const postId = Number(res);
        // 이미지 업로드
        const imgRef = ref(storageService, `post/${postId}`);
        uploadBytes(imgRef, file!)
          .then((res) => {
            getDownloadURL(res.ref)
              .then((res) => {
                PostData.postImg = res;
                console.log(PostData.postImg);
                postUpdate({
                  title: PostData.title,
                  content: PostData.content,
                  postImg: PostData.postImg,
                  postId: postId,
                })
                  .then((res) => {
                    console.log(res);
                    dispatch(postRegister(PostData));
                  })
                  .catch((err) => console.log("이미지 db에 저장 실패", err));
                modalClose();
              })
              .catch((err) => console.log("이미지 url 가져오기 실패", err));
            setPreviewImage("");
          })
          .catch((err) => console.log("이미지 firestore에 업로드 실패", err));
      })
      .catch((err) => console.log("포스팅 실패", err));
  };

  // 이미지 로드
  const onLoadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileList = event.target.files;

    if (fileList) {
      // console.log(fileList[0].name);
      setFileName(fileList[0].name);
      setFile(fileList[0]);
      setPreviewImage(URL.createObjectURL(fileList[0]));
    }
  };

  return (
    <div>
      <form style={{ width: "auto" }}>
        <div>
          <label htmlFor="title">제목</label>
          <input type="text" id="title" ref={titleInputRef} />
        </div>
        <div>
          <input
            value={fileName ? fileName : "첨부파일"}
            placeholder="첨부파일"
          />
          <label htmlFor="img">파일 찾기</label>
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={onLoadHandler}
          />
        </div>
        {previewImage && <img src={previewImage} alt="img" />}
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
