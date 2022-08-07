import { storageService } from "../fbase/fbase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  StorageReference,
} from "firebase/storage";
import React, { ChangeEvent, useState } from "react";

const FirebaseImgText: React.FC = () => {
  const [file, setFile] = useState<File>(); // 여러 개면 FileList 사용!
  const [images, setImages] = useState<{ id: number; url: string }[]>([]);
  const [fileImage, setFileImage] = useState("");

  const onLoadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileList = event.target.files;

    if (fileList) {
      console.log(fileList[0]);
      setFile(fileList[0]);
      setFileImage(URL.createObjectURL(fileList[0]));
    }

    // 파일 용량 체크
    // if(files.size > FILE_SIZE_MAX_LIMIT) {
    //   target.value = '';
    //   alert('업로드 가능한 최대 용량은 5MB입니다. ')
    //   return;
    // }
  };

  // 이미지 맨 뒤로 넣어주기
  const uploadHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    const listRef = ref(storageService, target);
    listAll(listRef)
      .then((res) => {
        return Number(res.items.at(-1)?.name) || 1; // 마지막 요소의 id 읽기, 없다면 1부터
      })
      .then((imagId) => {
        const imgRef = ref(storageService, `${target}/${imagId + 1}`); // 맨 마지막 id에 1을 더해 넣어주기
        uploadBytes(imgRef, file!);
      });
  };

  // 여러 사진 한 번에 읽어오기
  const readHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();

    const readURL = (ref: StorageReference, imgId: number) => {
      getDownloadURL(ref).then((res) => {
        imgList.push({ id: imgId, url: res });
        if (imgLength === imgList.length) {
          imgList.sort(function (a, b) {
            // id로 정렬
            return a.id - b.id;
          });
          setImages(imgList); // images에 담기
        }
      });
    };

    let imgLength = 0; // 이미지 개수 찾기
    const imgList: { id: number; url: string }[] = []; // 순서대로 이미지 값 넣기

    setImages([]); // 이미지 초기화
    const listRef = ref(storageService, target);

    listAll(listRef).then((res) => {
      // id 폴더 안의 이미지들 모두 읽어오기
      imgLength = Number(res.items.length); // 마지막 요소의 id 읽기
      res.items.forEach((itemRef) => {
        readURL(itemRef, Number(itemRef.name));
      });
    });
  };

  // 사진 제거
  const deleteHandler = (event: React.MouseEvent, target: string) => {
    event.preventDefault();
    const imgRef = ref(storageService, target);
    deleteObject(imgRef);
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
  };

  return (
    <div>
      <form>
        <label htmlFor="img">img 생성</label>
        <input type="file" accept="image/*" id="img" onChange={onLoadHandler} />
        <button type="button" onClick={(e) => uploadHandler(e, "challenge/1")}>
          업로드
        </button>
      </form>
      <button onClick={(e) => readHandler(e, "challenge/1")}>가져오기</button>
      <p>이미지 미리보기</p>
      <img src={fileImage} alt="img" />

      <p>이미지 목록</p>
      <ul>
        {images.map((item) => (
          <li key={item.id}>
            <img src={item.url} alt="img" />
            <button onClick={(e) => deleteHandler(e, `challenge/1/${item.id}`)}>
              사진삭제
            </button>
          </li>
        ))}
      </ul>

      <button onClick={(e) => deleteAllHandler(e, "challenge/1")}>
        전부 삭제
      </button>
    </div>
  );
};

export default FirebaseImgText;
