import { getDownloadURL, ref } from "firebase/storage";
import { storageService } from "../fbase/fbase";

// 반환 값은 이미지 경로 path이다.

// 프로필 사진 읽어오기
export const profileImgFetchAPI = async (id: number) => {
  const imgRef = ref(storageService, `user/${id}`);

  return getDownloadURL(imgRef)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return "";
    });
};

// 챌린지 사진 읽어오기
export const challengeImgFetchAPI = async (id: number) => {
  const imgRef = ref(storageService, `challenge/${id}`);

  return getDownloadURL(imgRef)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return "";
    });
};
