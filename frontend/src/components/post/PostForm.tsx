import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { PostSend } from "../../store/postModal";
import { postAdd, postImgApi } from "../../lib/withTokenApi";
import { postRegister } from "../../store/post";
import { useDispatch } from "react-redux";
import { StageState } from "../../store/stage";

import styles from "./PostForm.module.scss";

import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageService } from "../../fbase/fbase";
import { stageDetail } from "../../lib/generalApi";
// import { style } from "@mui/system";

const PostForm: React.FC<{
  stageId: number;
  modalClose: () => void;
  challenge: string | null;
}> = ({ stageId, modalClose, challenge }) => {
  const dispatch = useDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<ReactQuill>();

  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const [fileName, setFileName] = useState("");

  const [stageInfo, setStageInfo] = useState<StageState>();

  const PostData: PostSend = {
    title: "",
    content: "",
    stageId: stageId,
  };

  const [titleCnt, setTitleCnt] = useState("");

  const postingSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    PostData.title = titleInputRef.current!.value;
    PostData.content = contentInputRef.current!.value;
    console.log("입력된 포스트 데이터", PostData);
    postAdd(PostData)
      .then((res) => {
        const postId = Number(res);
        // 이미지 업로드
        if (file) {
          const imgRef = ref(storageService, `post/${postId}`);
          uploadBytes(imgRef, file)
            .then((res) => {
              getDownloadURL(res.ref)
                .then((res) => {
                  postImgApi(postId, res)
                    .then((res) => {
                      console.log(res);
                      dispatch(
                        postRegister({ ...PostData, postImg: [{ path: res }] })
                      );
                    })
                    .catch((err) => console.log("이미지 db에 저장 실패", err));
                })
                .catch((err) => console.log("이미지 url 가져오기 실패", err));
              setPreviewImage("");
            })
            .catch((err) => console.log("이미지 firestore에 업로드 실패", err));
        } else {
          dispatch(postRegister({ ...PostData, postImg: [{ path: [] }] }));
        }
        modalClose();
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

  useEffect(() => {
    stageDetail(stageId)
      .then((res) => {
        console.log(stageId);
        console.log(res);
        setStageInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stageId]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>포스팅 작성</div>
      <div className={styles.head}>
        <div>챌린지</div>
        <div>{challenge}</div>
        <div>스테이지</div>
        {stageInfo && (
          <div>
            {stageInfo.id}단계 - {stageInfo.name}
          </div>
        )}
      </div>
      <form className={styles.form}>
        <div className={styles.inputTitle}>
          <label htmlFor="title">제목</label>
          <div className={styles.titleCnt}>
            <input
              type="text"
              id="title"
              ref={titleInputRef}
              placeholder="포스팅 제목을 입력해주세요. (최대 30자)"
              maxLength={29}
              onChange={(event) => {
                setTitleCnt(event.target.value);
              }}
            />
            <div>{titleCnt.length} / 30</div>
          </div>
        </div>
        <input
          value={fileName ? fileName : "첨부파일"}
          placeholder="첨부파일"
        />
        <div className={styles.photo}>
          <div>사진 첨부 (선택)</div>
          <div>사진을 첨부해주세요.</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0 20px 0",
          }}
        >
          <label htmlFor="img">파일 찾기</label>
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={onLoadHandler}
          />
        </div>
        {previewImage ? (
          <img className={styles.img} src={previewImage} alt="preview img" />
        ) : (
          <img
            className={styles.img}
            src="https://via.placeholder.com/400x250.png/"
            alt=""
          />
        )}
        {/* 에디터 적용 */}
        <div>
          <EditorComponent
            QuillRef={contentInputRef}
            value={"자세하고 솔직한 작성은 다른 챌린저들에게 큰 도움이 됩니다."}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button className={styles.submitt} onClick={postingSubmitHandler}>
            등록하기
          </button>
        </div>
      </form>
    </div>
    // 모달창으로 할지, 페이지로 할지에 따라 닫기or 뒤로가기 버튼 구현 필요
  );
};
export default PostForm;
