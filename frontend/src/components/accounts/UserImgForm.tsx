import React, { ChangeEvent, useState } from "react";
import { storageService } from "../../fbase/fbase";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { profileImgFetchAPI } from "../../lib/imgApi";
import { userImgFetch } from "../../store/auth";
import { useDispatch } from "react-redux";

const UserImgForm: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);
  const userImg = useSelector((state: RootState) => state.auth.userInfo.img);
  const dispatch = useDispatch();

  // 이미지 로드
  const onLoadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileList = event.target.files;

    if (fileList) {
      console.log(fileList[0]);
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
            <label htmlFor="img">img 생성</label>
            <input
              type="file"
              accept="image/*"
              id="img"
              onChange={onLoadHandler}
            />
            <button
              type="button"
              onClick={(e) => uploadHandler(e, `user/${userId}`)}
            >
              업로드
            </button>
          </form>
          <p>이미지 미리보기</p>
          <img src={previewImage} alt="img" />
        </div>
      ) : (
        <div>
          <p>유저 이미지</p>
          <img src={userImg} alt="img" />
          <button onClick={(e) => deleteHandler(e, `user/${userId}`)}>
            프로필 사진 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default UserImgForm;
