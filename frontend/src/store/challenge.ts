import { UserInfo } from "./auth";
import { Stage } from "./stage";

export interface Hobby {
  id: number | null;
  name: string | null;
}

// 챌린지 리스트 정보
export interface ChallengeItemState {
  id: number | null;
  name: string | null;
  img: string | null;
  description: string | null;
  hobbyList: Hobby[];
  writer: UserInfo;
  level: number | null;
  userProgress: number | null;
  likeNum: number | null;
}


// 챌린지 디테일 정보
export interface ChallengeDetailState {
  id: number | null;
  createdTime: string | null;
  modifiedTime: string | null;
  name: string | null;
  img: string | null;
  content: string | null;
  level: number | null;
  userProgress: number | null;  
  writer: UserInfo;
  stageList: Stage[];
  likeNum: number | null;
  // 리뷰
  // reviewList: 
  hobbyList: Hobby[];
}