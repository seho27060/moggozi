import React, { ChangeEvent, useState } from "react";
import { storageService } from "../../fbase/fbase";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { profileImgFetchAPI } from "../../lib/imgApi";
import { userImgFetch } from "../../store/auth";
import { useDispatch } from "react-redux";

import styles from "./UserImgForm.module.scss";

const UserImgForm: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const [fileName, setFileName] = useState("");
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);
  const userImg = useSelector((state: RootState) => state.auth.userInfo.img);
  const dispatch = useDispatch();

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

  // 이미지 서버에 업로드
  const uploadHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    const imgRef = ref(storageService, target);
    uploadBytes(imgRef, file!).then(() => {
      profileImgFetchAPI(userId!).then((res) => dispatch(userImgFetch(res)));
      setPreviewImage("");
    });
  };

  // 이미지 제거
  const deleteHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    const imgRef = ref(storageService, target);
    deleteObject(imgRef);

    profileImgFetchAPI(userId!).then((res) => dispatch(userImgFetch(res)));
  };

  return (
    <div>
      {!userImg ? (
        <div>
          <form>
            <div className={styles.filebox}>
              <input
                className={styles.uploadName}
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
            <button
              type="button"
              onClick={(e) => uploadHandler(e, `user/${userId}`)}
            >
              업로드
            </button>
          </form>
          {previewImage && <img src={previewImage} alt="img" />}
        </div>
      ) : (
        <div className={styles.deleteButton}>
          <img src={userImg} alt="img" />
          <div>
            <button onClick={(e) => deleteHandler(e, `user/${userId}`)} >
              프로필 사진 삭제
            </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default UserImgForm;
