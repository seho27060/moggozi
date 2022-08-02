import { UserInfo } from "./auth";

export interface PostState {
  id : number|null,
  stageId : number|null,
  title : string|null,
  content: string|null,
  createdTime : Date|null,
  modifiedTime : Date|null,
  img : string|null,
  writer : UserInfo,
  likeCount : number|null,
}

// 스테이지에 포함된 postings 타입np
export interface PostItemState {
  id : number|null,
  title : string|null,  
  likeCount : number|null,
  img : string|null,
  writer : UserInfo,
}
