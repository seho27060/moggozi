import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { storageService } from "../../fbase/fbase";
import { challengeImgApi } from "../../lib/withTokenApi";

const ChallengeImgForm: React.FC<{
  challengeImg: string;
  imgHandler: (url: string) => void;
}> = ({ challengeImg, imgHandler }) => {
  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const challengeId = Number(useParams().id);

  // 이미지 로드
  const onLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileList = event.target.files;

    if (fileList) {
      console.log(fileList[0]);
      setFile(fileList[0]);
      setPreviewImage(URL.createObjectURL(fileList[0]));
    }
  };

  // 이미지 업로드
  const uploadHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    const imgRef = ref(storageService, target);
    uploadBytes(imgRef, file!).then((res) => {
      getDownloadURL(res.ref).then((res) => {
        console.log(res);
        imgHandler(res);
        challengeImgApi(challengeId, res);
      });
      setPreviewImage("");
    });
  };

  // 이미지 제거
  const deleteHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    const imgRef = ref(storageService, target);
    deleteObject(imgRef);
    imgHandler("");
    challengeImgApi(challengeId, "");
  };

  return (
    <div>
      {!challengeImg ? (
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
              onClick={(e) => uploadHandler(e, `challenge/${challengeId}`)}
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
          <img src={challengeImg} alt="img" />
          <button onClick={(e) => deleteHandler(e, `challenge/${challengeId}`)}>
            프로필 사진 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeImgForm;
