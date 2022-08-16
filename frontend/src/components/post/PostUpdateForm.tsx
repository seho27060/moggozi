import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import {
  PostUpdateSend,
  setPostUpdateFormState,
  setModalPostState,
} from "../../store/postModal";
import { postModify, PostData, setCheckedPost } from "../../store/post";
import { useDispatch, useSelector } from "react-redux";
import { postImgApi, postUpdate } from "../../lib/withTokenApi";
import { RootState } from "../../store/store";

import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";

import styles from "./PostUpdateForm.module.scss";
import { storageService } from "../../fbase/fbase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { modifyUserPagePostList } from "../../store/userPage";
// 생성폼 -> <PostUpdateForm post = {null}/>
// 수정폼 -> <PostForm post = {수정할려는 포스트 데이터}/>

const PostUpdateForm: React.FC<{}> = () => {
  const { postModalState: PostModalState } = useSelector(
    (state: RootState) => state.postModal
  );
  console.log(PostModalState);

  const dispatch = useDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<ReactQuill>();

  const [titleCnt, setTitleCnt] = useState("");
  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [checkModifyToggle, setCheckModifyToggle] = useState(false);

  const postingUpdateHandler = (event: MouseEvent) => {
    event.preventDefault();
    console.log("!!!", contentInputRef.current!.value);
    const PostUpdateData: PostUpdateSend = {
      postId: PostModalState!.id!,
      title: titleInputRef.current!.value,
      content: contentInputRef.current!.value,
    };

    const modifiedModalPost: PostData = {
      id: PostModalState!.id!,
      title: titleInputRef.current!.value,
      content: contentInputRef.current!.value,
      postImg: PostModalState!.postImg,
      createdTime: PostModalState!.createdTime,
      modifiedTime: PostModalState!.modifiedTime,
      writer: PostModalState!.writer,
      liked: PostModalState!.liked,
      likeNum: PostModalState!.likeNum,
    };

    postUpdate(PostUpdateData)
      .then((res) => {
        // 이미지 업로드
        if (file) {
          const imgRef = ref(storageService, `post/${PostUpdateData.postId}`);
          uploadBytes(imgRef, file).then((res) => {
            getDownloadURL(res.ref).then((res) => {
              modifiedModalPost.postImg = [{ path: res }];
              postImgApi(PostUpdateData.postId!, res).then((res) => {
                console.log("post 수정완료", res);
                dispatch(postModify(modifiedModalPost));
                // 
                dispatch(modifyUserPagePostList(modifiedModalPost))
                dispatch(setPostUpdateFormState(false));
                dispatch(setModalPostState(modifiedModalPost));
                dispatch(setCheckedPost(modifiedModalPost));
              });
            });
            setPreviewImage("");
          });
        } else {
          console.log("post 수정완료", res);
          dispatch(postModify(modifiedModalPost));
          dispatch(modifyUserPagePostList(modifiedModalPost))

          dispatch(setPostUpdateFormState(false));
          dispatch(setModalPostState(modifiedModalPost));
          dispatch(setCheckedPost(modifiedModalPost));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setCheckModifyToggle(false);
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
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.inputTitle}>
          <label htmlFor="title">제목</label>
          <div className={styles.titleCnt}>
            <input
              type="text"
              id="title"
              ref={titleInputRef}
              defaultValue={PostModalState!.title!}
              onChange={(event) => {
                setTitleCnt(event.target.value);
              }}
            />
            <div>{titleCnt.length} / 30</div>
          </div>
        </div>
        <div>
          <input
            defaultValue={fileName ? fileName : "첨부파일"}
            placeholder="첨부파일을 추가해주세요"
          />
          {/* <div className={styles.photo}>
            <div>사진 첨부 (선택)</div>
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 20px",
            }}
          >
            {/* <div>
              사진 첨부
              
            </div> */}
            <label htmlFor="img" />
            <input
              type="file"
              accept="image/*"
              id="img"
              onChange={onLoadHandler}
              style={{ width: "11rem" }}
            />
          </div>
        </div>
        <div className={styles.editorSection}>
          {previewImage ? (
            <img src={previewImage} alt="img" />
          ) : (
            <img
              className={styles.img}
              src={
                PostModalState!.postImg.length !== 0
                  ? PostModalState!.postImg[0].path!
                  : "https://via.placeholder.com/400x360.png/"
              }
              alt=""
            />
          )}
          <div style={{ height: "340px" }}>
            <EditorComponent
              QuillRef={contentInputRef}
              value={PostModalState!.content!}
              maxlength = {300}
            />
          </div>
        </div>
        <div
          style={{
            width: "auto",
            display: "flex",
            justifyContent: "flex-end",
            margin: "0.3rem 1rem 0 0",
          }}
        >
          {!checkModifyToggle && (
            <button
              onClick={() => {
                setCheckModifyToggle(true);
              }}
              style={{ width: "4rem", margin: "10px 2rem" }}
            >
              수정하기
            </button>
          )}
          {checkModifyToggle && (
            <div>
              <button
                onClick={postingUpdateHandler}
                style={{ width: "4rem", margin: "10px 5px 10px 5px" }}
              >
                수정완료
              </button>
              <button
                onClick={() => {
                  setCheckModifyToggle(false);
                }}
                style={{ width: "4rem" }}
              >
                취소
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default PostUpdateForm;
