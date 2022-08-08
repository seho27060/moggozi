import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storageService } from "../fbase/fbase";
import { imgState } from "../store/stage";

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

// 스테이지 사진 읽어오기
export const stageImgFetchAPI = async (id: number) => {
  const imgList: imgState[] = []; // 순서대로 이미지 값 넣기
  const listRef = ref(storageService, `stage/${id}`);

  return listAll(listRef)
    .then(async (res) => {
      await res.items.reduce(async (acc, itemRef) => {
        await acc.then();
        await getDownloadURL(itemRef).then((res) => {
          imgList.push({ id: Number(itemRef.name), url: res });
        });
        return acc;
      }, Promise.resolve());
    })
    .then(() => {
      return imgList;
    });
};

// 포스팅 사진 읽어오기
export const postImgFetchAPI = async (id: number) => {
  const imgRef = ref(storageService, `post/${id}`);

  return getDownloadURL(imgRef)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return "";
    });
};
