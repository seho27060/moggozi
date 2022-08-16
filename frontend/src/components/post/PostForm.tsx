import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { PostSend } from "../../store/postModal";
import { postAdd, postImgApi } from "../../lib/withTokenApi";
import { PostData, postRegister, setCheckedPost } from "../../store/post";
import { useDispatch, useSelector } from "react-redux";
import { StageState } from "../../store/stage";

import styles from "./PostForm.module.scss";

import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageService } from "../../fbase/fbase";
import { stageDetail } from "../../lib/generalApi";
import { RootState } from "../../store/store";
import { useQuill } from "react-quilljs";
// import { style } from "@mui/system";

const PostForm: React.FC<{
  stageId: number;
  modalClose: () => void;
  challenge: string | null;
}> = ({ stageId, modalClose, challenge }) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<ReactQuill>();

  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  const [stageInfo, setStageInfo] = useState<StageState>();

  const PostData: PostSend = {
    title: "",
    content: "",
    stageId: stageId,
  };

  const [titleCnt, setTitleCnt] = useState("");
  const postingSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    const textLength = Number(
      document.getElementById("counter")!.innerText.slice(0, -2)
    );
    PostData.title = titleInputRef.current!.value;
    PostData.content = contentInputRef.current!.value;
    console.log("입력된 포스트 데이터", PostData);
    if (textLength > 300 || PostData.title.length === 0 || PostData.title.length > 30) {
      if (PostData.title.length === 0) {
        alert("제목을 입력해주세요");
      }
      if (PostData.title.length > 30) {
        alert("제목을 30자 미만(공백포함)으로 작성해주세요");
      }
      if (textLength > 300) {
        alert("포스팅은 300자 미만(공백포함)으로 작성해주세요.");
      }
    } else {
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
                        const newPostData: PostData = {
                          content: contentInputRef.current!.value,
                          createdTime: new Date(),
                          id: postId,
                          liked: false,
                          likeNum: 0,
                          modifiedTime: new Date(),
                          postImg: [],
                          title: titleInputRef.current!.value,
                          writer: user.userInfo,
                        };
                        dispatch(
                          postRegister({
                            ...PostData,
                            postImg: [{ path: res }],
                          })
                        );
                        dispatch(
                          setCheckedPost({
                            ...newPostData,
                            postImg: [{ path: res }],
                          })
                        );
                        alert("포스팅이 등록되었습니다.");
                      })
                      .catch((err) =>
                        console.log("이미지 db에 저장 실패", err)
                      );
                  })
                  .catch((err) => console.log("이미지 url 가져오기 실패", err));
                setPreviewImage("");
              })
              .catch((err) =>
                console.log("이미지 firestore에 업로드 실패", err)
              );
          } else {
            const newPostData: PostData = {
              content: contentInputRef.current!.value,
              createdTime: new Date(+new Date() + 3240 * 10000),
              id: postId,
              liked: false,
              likeNum: 0,
              modifiedTime: new Date(),
              postImg: [],
              title: titleInputRef.current!.value,
              writer: user.userInfo,
            };
            dispatch(postRegister({ ...newPostData, postImg: [{ path: [] }] }));
            dispatch(
              setCheckedPost({ ...newPostData, postImg: [{ path: [] }] })
            );
          }
          alert("포스팅이 등록되었습니다.");
          modalClose();
        })
        .catch((err) => console.log("포스팅 실패", err));
    }
  };

  // 이미지 로드
  const onLoadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileList = event.target.files;

    if (fileList) {
      // console.log(fileList[0].name);
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
      {/* <div className={styles.title}>포스팅 작성</div>
      <div className={styles.head}>
        <div>챌린지</div>
        <div>{challenge}</div>
        <div>스테이지</div>
        {stageInfo && (
          <div>
            {stageInfo.id}단계 - {stageInfo.name}
          </div>
        )}
      </div> */}
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
        <div className={styles.photo}>
          <div>사진 첨부 (필수)</div>
          <div>사진을 첨부해주세요.</div>
        </div>
        <div className={styles.imageForm}>
          <label htmlFor="img">
            
            <div className={styles.image}>
              <div className={styles.addImg}>
                <div>이곳을 눌러</div>
                <div>사진을 추가해주세요</div>
                <div>*권장 사이즈 1920x1920</div>
                <div>최소 640x640 (1:1)</div>
              </div>
            </div>
          </label>
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={onLoadHandler}
          />
          <div>
            <div style={{textAlign: 'center', marginBottom: "5px"}}>사진 미리보기</div>
          {previewImage ? (
            <img className={styles.img} src={previewImage} alt="preview img" />
          ) : (
            <img
              className={styles.img}
              src="https://blog.kakaocdn.net/dn/vckff/btqCjeJmBHM/tMVpe4aUIMfH4nKS4aO3tK/img.jpg"
              alt=""
            />
          )}
          </div>
        </div>
        {/* 에디터 적용 */}
        <div>
          <EditorComponent
            QuillRef={contentInputRef}
            value={"자세하고 솔직한 작성은 다른 챌린저들에게 큰 도움이 됩니다."}
            maxlength={300}
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
