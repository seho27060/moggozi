import { deleteObject, listAll, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storageService } from "../../fbase/fbase";
import { stageImgFetchAPI } from "../../lib/imgApi";
import { imgState, stageFetch, StageState } from "../../store/stage";
import { RootState } from "../../store/store";

const StageImgForm: React.FC<{
  stage: StageState;
}> = ({ stage }) => {
  console.log(stage);
  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const stages = useSelector((state: RootState) => state.stages);
  const dispatch = useDispatch();
  // 이미지 로드
  const onLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileList = event.target.files;

    if (fileList) {
      console.log(fileList[0]);
      setFile(fileList[0]);
      setPreviewImage(URL.createObjectURL(fileList[0]));
      event.target.value = ""; // 이미지 업로드하고 초기화
    }
  };

  // 이미지 서버에 업로드
  const uploadHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    const listRef = ref(storageService, target);
    listAll(listRef)
      .then((res) => {
        return Number(res.items.at(-1)?.name) || 0; // 마지막 요소의 id 읽기, 없다면 1부터
      })
      .then((imagId) => {
        const imgRef = ref(storageService, `${target}/${imagId + 1}`); // 맨 마지막 id에 1을 더해 넣어주기
        uploadBytes(imgRef, file!).then(() => {
          stageImgFetchAPI(stage.id!).then((res) => {
            const newStages = stages.map((item) =>
              item.id === stage.id ? { ...item, img: res } : item
            );
            dispatch(stageFetch(newStages));
          });
        });
        setPreviewImage("");
      });
  };

  const deleteHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    const imgRef = ref(storageService, target);
    deleteObject(imgRef);

    stageImgFetchAPI(stage.id!)
      .then((res) => {
        const newStages = stages.map((item) =>
          item.id === stage.id ? { ...item, img: res } : item
        );
        dispatch(stageFetch(newStages));
      })
      .catch((err) => {
        const newStages = stages.map((item) =>
          item.id === stage.id ? { ...item, img: [] } : item
        );
        dispatch(stageFetch(newStages));
      });
  };

  // 사진 몽땅 제거
  const deleteAllHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();

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
      })
      .catch((err) => {
        const newStages = stages.map((item) =>
          item.id === stage.id ? { ...item, img: [] } : item
        );
        dispatch(stageFetch(newStages));
      });
  };
  return (
    <div>
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
            onClick={(e) => uploadHandler(e, `stage/${Number(stage.id!)}`)}
          >
            업로드
          </button>
        </form>
        <p>이미지 미리보기</p>
        <img src={previewImage} alt="img" />
      </div>

      <div>
        <p>스테이지 이미지들</p>
        <ul>
          {Array.isArray(stage.img) &&
            stage.img.map((img: imgState) => {
              return (
                <li key={img.id}>
                  <img src={img.url!} alt="img" />
                  <button
                    onClick={(e) =>
                      deleteHandler(e, `stage/${Number(stage.id!)}/${img.id}`)
                    }
                  >
                    삭제
                  </button>
                </li>
              );
            })}
        </ul>
        <button
          onClick={(e) => deleteAllHandler(e, `stage/${Number(stage.id!)}`)}
        >
          사진 모두 삭제
        </button>
      </div>
    </div>
  );
};

export default StageImgForm;
