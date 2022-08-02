export interface post {
  postId : number|null,
  memberId : number|null,
  stageId : number|null,
  title : string|null,
  content: string|null,
  postTime : Date|null,
  updateTime : Date|null,
  postImg : string|null
}

export interface postWriter {
  id: number;
  name: string | null;
}

// 스테이지에 포함된 postings 타입
export interface posting {
  id : number|null,
  title : string|null,  
  likeCount : number|null,
  img : string|null,
  writer : postWriter
}
