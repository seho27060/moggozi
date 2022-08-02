import { UserInfo } from "./auth";

export interface PostState {
  postId : number|null,
  memberId : number|null,
  stageId : number|null,
  title : string|null,
  content: string|null,
  postTime : Date|null,
  updateTime : Date|null,
  postImg : string|null
}

// 스테이지에 포함된 postings 타입np
export interface PostItemState {
  id : number|null,
  title : string|null,  
  likeCount : number|null,
  img : string|null,
  writer : UserInfo,
}
