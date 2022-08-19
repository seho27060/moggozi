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
import ChoiceModal from "../../components/ui/ChoiceModal";
import ReactQuill from "react-quill";

import styles from "./PostUpdateForm.module.scss";
import no_image from "../../asset/no_image.png";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState("수정하시겠습니까?");

  const closeModal = () => {
    setModalOpen(false);
  };

  const postingUpdateHandler = (event: MouseEvent) => {
    event.preventDefault();
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
                dispatch(postModify(modifiedModalPost));
                dispatch(modifyUserPagePostList(modifiedModalPost));
                dispatch(setPostUpdateFormState(false));
                dispatch(setModalPostState(modifiedModalPost));
                dispatch(setCheckedPost(modifiedModalPost));
              });
            });
            setPreviewImage("");
          });
        } else {
          dispatch(postModify(modifiedModalPost));
          dispatch(modifyUserPagePostList(modifiedModalPost));
          dispatch(setPostUpdateFormState(false));
          dispatch(setModalPostState(modifiedModalPost));
          dispatch(setCheckedPost(modifiedModalPost));
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.posting}>포스팅 수정</div>
        <div className={styles.inputTitle}>
          <div className={styles.titleCnt}>
            <input
              type="text"
              id="title"
              ref={titleInputRef}
              defaultValue={PostModalState!.title!}
              placeholder="포스팅 제목을 입력하세요."
              maxLength={30}
              autoComplete="off"
              onChange={(event) => {
                setTitleCnt(event.target.value);
              }}
            />
            <div>{titleCnt.length} / 30</div>
          </div>
        </div>
        <div>
          <div className={styles.fileselect}>
            <label htmlFor="img" className={styles.labelbutton}>
              파일 선택
            </label>
            <input
              type="file"
              accept="image/*"
              id="img"
              onChange={onLoadHandler}
            />
          </div>
        </div>
        <div className={styles.editorSection}>
          {previewImage ? (
            <img className={styles.img} src={previewImage} alt="img" />
          ) : (
            <img
              className={styles.img}
              src={
                PostModalState!.postImg.length !== 0
                  ? PostModalState!.postImg[0].path!
                  : no_image
              }
              alt=""
            />
          )}
          <div style={{ height: "340px" }}>
            <EditorComponent
              QuillRef={contentInputRef}
              value={PostModalState!.content!}
              maxlength={300}
            />
          </div>
        </div>
        <div className={styles.finishBtn}>
          <button
            className={styles.button}
            onClick={(event) => {
              event.preventDefault();
              setContent("수정하시겠습니까?");
              setModalOpen(true);
            }}
          >
            수정완료
          </button>
        </div>
      </form>
      <ChoiceModal
        open={modalOpen}
        close={closeModal}
        choice1={closeModal}
        choice2={postingUpdateHandler}
        header="안내"
      >
        {content}
      </ChoiceModal>
    </div>
  );
};
export default PostUpdateForm;
