import { storageService } from "../fbase/fbase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import React, { ChangeEvent, FormEvent, useState } from "react";

const FirebaseImgText: React.FC = () => {
  //const imgRef = ref(storageService, "/");
  //uploadBytes(주소, '들어갈 파일');
  //getDownloadURL(주소)
  // 비동기 처리
  //deleteObject(주소)
  const [file, setFile] = useState<File>(); // 여러 개면 FileList 사용!

  const onLoadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileList = event.target.files;

    if (fileList) {
      console.log(fileList[0]);
      setFile(fileList[0]);
    }
    // 파일 용량 체크
    // if(files.size > FILE_SIZE_MAX_LIMIT) {
    //   target.value = '';
    //   alert('업로드 가능한 최대 용량은 5MB입니다. ')
    //   return;
    // }
  };
  let num = 0;
  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    num += 1;
    const imgRef = ref(storageService, `a/${num}`);
    const response = await uploadBytes(imgRef, file!);
  };

  // 배열로 읽어오기 완료
  const readHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const listRef = ref(storageService, "a");
    listAll(listRef).then((res) => {
      res.items.forEach((itemRef) => {
        console.log(itemRef.name);
        const url = getDownloadURL(itemRef).then((res) => {
          console.log(res);
        });
      });
    });
  };

  return (
    <div>
      <form>
        <label htmlFor="img">img 생성</label>
        <input type="file" accept="image/*" id="img" onChange={onLoadHandler} />
        <button type="button" onClick={submitHandler}>
          생성
        </button>
      </form>
      <button onClick={readHandler}>가져오기</button>
    </div>
  );
};

export default FirebaseImgText;
