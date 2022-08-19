import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ChallengeForm from "../../components/challenge/ChallengeForm";
import { resetHobby } from "../../store/challenge";

import styles from "./ChallengeNew.module.scss";

const ChallengeNew: React.FC = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");

  // state에 담겨있는 취미 지워주기
  useEffect(() => {
    dispatch(resetHobby());
  }, [dispatch]);

  // 이미지 로드
  const onLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileList = event.target.files;

    if (fileList) {
      setFile(fileList[0]);
      setPreviewImage(URL.createObjectURL(fileList[0]));
    }
  };

  const deleteHandler = (event: React.MouseEvent) => {
    setFile(null);
    setPreviewImage("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.width}>
        <div className={styles.title}>챌린지 생성</div>
        <div className={styles.imgForm}>
          <form className={styles.container}>
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
          {!!file && (
            <button
              className={styles.uploadButton}
              type="button"
              onClick={deleteHandler}
            >
              이미지제거
            </button>
          )}
        </div>
        <ChallengeForm file={file}></ChallengeForm>
      </div>
    </div>
  );
};

export default ChallengeNew;
