import { deleteObject, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storageService } from "../../fbase/fbase";
import { stageImgFetchAPI } from "../../lib/imgApi";
import { imgState, stageFetch, StageState } from "../../store/stage";
import { RootState } from "../../store/store";
import Loader from "../ui/Loader";
import Modal from "../ui/Modal";

import styles from "./StageImgForm.module.scss";

const StageImgForm: React.FC<{
  stage: StageState;
}> = ({ stage }) => {
  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const [images, setImages] = useState<imgState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const stages = useSelector((state: RootState) => state.stages);
  const dispatch = useDispatch();
  const [alertText, setAlertText] = useState(<div></div>);
  const [modalOpen, setModalOpen] = useState(false);

  const closeAlertModal = () => {
    document.body.style.overflow = "unset";
    setModalOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    stageImgFetchAPI(stage.id!).then((res) => {
      setImages(res);
      setIsLoading(false);
    });
  }, [stage.id]);

  // 이미지 로드
  const onLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileList = event.target.files;

    if (fileList) {
      setFile(fileList[0]);
      setPreviewImage(URL.createObjectURL(fileList[0]));
      event.target.value = ""; // 이미지 업로드하고 초기화
    }
  };

  // 이미지 서버에 업로드
  const uploadHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    if (!file) {
      setAlertText(<div>사진을 넣어주세요.</div>);
      setModalOpen(true);
      return;
    }
    if (images.length >= 5) {
      setAlertText(<div>스테이지 이미지는 5장까지 가능합니다.</div>);
      setModalOpen(true);
      return;
    }
    setIsLoading(true);
    const listRef = ref(storageService, target);
    listAll(listRef)
      .then((res) => {
        return Number(res.items.at(-1)?.name) || 0; // 마지막 요소의 id 읽기, 없다면 1부터
      })
      .then((imagId) => {
        const imgRef = ref(storageService, `${target}/${imagId + 1}`); // 맨 마지막 id에 1을 더해 넣어주기
        uploadBytes(imgRef, file!).then(() => {
          stageImgFetchAPI(stage.id!).then((res) => {
            setImages(res);
            setIsLoading(false);
          });
        });
        setPreviewImage("");
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const deleteHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setIsLoading(true);
      const imgRef = ref(storageService, target);
      deleteObject(imgRef);
      stageImgFetchAPI(stage.id!)
        .then((res) => {
          setImages(res);
          setIsLoading(false);
        })
        .catch((err) => {
          setImages([]);
          setIsLoading(false);
        });
      setAlertText(<div>삭제되었습니다.</div>);
      setModalOpen(true);
    } else {
      setAlertText(<div>취소되었습니다.</div>);
      setModalOpen(true);
    }
  };

  // 사진 몽땅 제거
  const deleteAllHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    if (!images) {
      setAlertText(<div>이미지가 존재하지 않습니다.</div>);
      setModalOpen(true);
    }
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setIsLoading(true);
      const listRef = ref(storageService, target);
      listAll(listRef).then((res) => {
        // id 폴더 안의 이미지들 모두 읽어오기
        res.items.forEach((itemRef) => {
          deleteObject(itemRef);
        });
      });

      stageImgFetchAPI(stage.id!)
        .then((res) => {
          const newStages = stages.map((item) =>
            item.id === stage.id ? { ...item, img: res } : item
          );
          dispatch(stageFetch(newStages));
          setIsLoading(true);
        })
        .catch((err) => {
          const newStages = stages.map((item) =>
            item.id === stage.id ? { ...item, img: [] } : item
          );
          dispatch(stageFetch(newStages));
          setIsLoading(true);
        });
      setAlertText(<div>삭제되었습니다.</div>);
      setModalOpen(true);
    } else {
      setAlertText(<div>취소되었습니다.</div>);
      setModalOpen(true);
    }
  };
  return (
    <div className={styles.container}>
      <div>
        <form className={styles.form}>
          <div className={styles.image}>
            <label htmlFor="img">
              <div>포스팅 사진을 업로드해주세요.</div>
              <div>*권장 사이즈: 1920 x 1920,</div>
              <div> 최소 640 x 640 비율 (1 : 1)</div>
              <div>등록하기</div>
            </label>
            <input
              type="file"
              accept="image/*"
              id="img"
              onChange={onLoadHandler}
            />
          </div>
          <div className={styles.explain}>
            등록하기 버튼을 눌러 이미지를 등록한 후, 업로드 버튼을 눌러주세요!
          </div>
        </form>

        <div className={styles.middle}>
          <div className={styles.preview}>
            <div>이미지 미리보기</div>
            {previewImage ? (
              <img src={previewImage} alt="img" />
            ) : (
              <div>아직 등록된 이미지가 없습니다.</div>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => uploadHandler(e, `stage/${Number(stage.id!)}`)}
          >
            업로드
          </button>
        </div>
      </div>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={styles.upload}>
          <div className={styles.title}>업로드된 이미지들</div>
          <div className={styles.photos}>
            {Array.isArray(images) &&
              images.map((img: imgState) => {
                return (
                  <div key={img.id}>
                    <img src={img.url!} alt="img" />
                    <button
                      onClick={(e) =>
                        deleteHandler(e, `stage/${Number(stage.id!)}/${img.id}`)
                      }
                    >
                      삭제
                    </button>
                  </div>
                );
              })}
          </div>
          <div className={styles.buttons}>
            <button
              onClick={(e) => deleteAllHandler(e, `stage/${Number(stage.id!)}`)}
            >
              사진 모두 삭제
            </button>
          </div>
        </div>
      )}
      <Modal open={modalOpen} close={closeAlertModal} header="안내">
        {alertText}
      </Modal>
    </div>
  );
};

export default StageImgForm;
