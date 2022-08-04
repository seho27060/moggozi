import { PostItemState } from "./post";

export interface Stage {
  id : number | null,
  challengeId : number | null,
  name : string | null,
  period : number | null,
  content : string | null,
  stageImg : string | undefined,
  createDate : number | null,
  modifiedDate : number | null,
  postOrder : number | null,
  postList: PostItemState[] | null,
}
