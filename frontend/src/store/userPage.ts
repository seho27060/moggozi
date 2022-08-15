import { Value } from "react-quill";
import { PostImgData } from "./post";

export interface UserChallengeType {
  id: number | null;
  img: string | null;
  level: number | null;
  state: number | null;
  name: string | null;
}

export interface UserPostType {
  id: number;
  title: string | null;
  content: Value | string | null;
  createdDate: Date | null;
  modifiedDate: Date | null;
  postImg: PostImgData[];
  state: number | null;
  postLikeList: {
    id: number | null;
  }[];
  postComment: {
    createdDate: Date | null;
    modifiedDate: Date | null;
    id: number;
    text: string | null;
    parent: number | null;
    commentOrder: number | null;
    state: number | null;
  }[];
}
