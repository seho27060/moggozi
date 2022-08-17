import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { storageService } from "../../fbase/fbase";
import { challengeImgApi } from "../../lib/withTokenApi";

import styles from "./ChallengeImgForm.module.scss";

const ChallengeImgForm: React.FC<{
  challengeImg: string;
  imgHandler: (url: string) => void;
  challengeId: number;
}> = ({ challengeImg, imgHandler, challengeId }) => {
  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  // 이미지 로드
  const onLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileList = event.target.files;

    if (fileList) {
      setFile(fileList[0]);
      setPreviewImage(URL.createObjectURL(fileList[0]));
    }
  };

  // 이미지 업로드
  const uploadHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    const imgRef = ref(storageService, target);
    uploadBytes(imgRef, file!)
      .then((res) => {
        getDownloadURL(res.ref).then((res) => {
          imgHandler(res);
          challengeImgApi(challengeId, res);
        });
        setPreviewImage("");
      })
      .catch((err) => console.log(err));
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
    <div className={styles.container}>
      {!challengeImg ? (
        <div>
          <form>
            {previewImage ? (
              <img className={styles.previewImg} src={previewImage} alt="img" />
            ) : (
              <div>
                <label htmlFor="img" className={styles.label}>
                  <div className={styles.readyImg}>
                    <div>해당 창을 클릭해</div>
                    <div>커버 사진을 업로드해 주세요.</div>
                    <div>
                      *권장 사이즈: 1920 x 1080, 최소 960 x 540 비율 (16:9){" "}
                    </div>
                    <div>커버사진 추가하기</div>
                  </div>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="img"
                  className={styles.fileInput}
                  onChange={onLoadHandler}
                />
              </div>
            )}
          </form>
          <button
            className={styles.uploadButton}
            type="button"
            onClick={(e) => uploadHandler(e, `challenge/${challengeId}`)}
          >
            업로드
          </button>
        </div>
      ) : (
        <div>
          {/* <p>{challengeImg}</p> */}
          <img
            className={`${styles.previewImg} ${styles.coverImg}`}
            src={challengeImg}
            alt=""
          />
          <button
            className={styles.editButton}
            onClick={(e) => deleteHandler(e, `challenge/${challengeId}`)}
          >
            이미지 수정
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeImgForm;
