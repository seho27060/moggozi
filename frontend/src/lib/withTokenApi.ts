import axios from "axios";
import { apiConfig } from "../config";
import { ChallengeSaveState } from "../store/challenge";
import { CommentSend } from "../store/comment";
import { StageSaveState } from "../store/stage";
import { refresh, refreshErrorHandle } from "./refresh";

const withTokenApi = axios.create({
  baseURL: apiConfig.apiRoot,
  timeout: 10000,
  params: {},
});

withTokenApi.interceptors.request.use(refresh, refreshErrorHandle);

export default withTokenApi;

// 계정 관련
export const persistAuth = async () => {
  const { data } = await withTokenApi.get(`/user/myinfo`);
  return data;
};

export const userDetail = async () => {
  const { data } = await withTokenApi.get(`/user/myinfo`);
  return data;
};

export const logoutApi = async () => {
  const { data } = await withTokenApi.post("/user/logout");
  return data;
};

export const updateUserApi = async (id: number | null, option: object) => {
  const { data } = await withTokenApi.post(`/user/update/${id}`, option);
  return data;
};

export const updatePw = async (option: object) => {
  const { data } = await withTokenApi.post("/user/updatepw", option);
  return data;
};

export const withdrawal = async (option: object) => {
  const { data } = await withTokenApi.post("/user/delete", option);
  return data;
};

export const followApi = async(toId: number | null) => {
  const { data } = await withTokenApi.post(`/user/follow/${toId}`);
  return data
}

export const followedApi = async(toMember: number, loginID: number) => {
  const { data } = await withTokenApi.get(`user/followed/${toMember}/${loginID}`)
  return data;
}

export const followingApi = async(fromMemberId: number) => {
  const { data } = await withTokenApi.get(`user/following/${fromMemberId}`) 
  return data;
}

// 챌린지 관련
export const isLoginFetchChallenge = async (id: number) => {
  const { data } = await withTokenApi.get(`/challenge/${id}`);
  return data;
};

export const isLoginFetchChallengeRankList = async () => {
  const { data } = await withTokenApi.get("/challenge/rank");
  return data;
};

export const challengeAdd = async (challengeAddData: ChallengeSaveState) => {
  const { data } = await withTokenApi.post("/challenge/save", challengeAddData);
  return data;
};

export const challengeUpdate = async (
  challengeUpdateData: ChallengeSaveState,
  id: number
) => {
  const { data } = await withTokenApi.put(
    `/challenge/${id}`,
    challengeUpdateData
  );
  return data;
};

export const challengeDelete = async (id: number) => {
  const { data } = await withTokenApi.delete(`/challenge/${id}`);
  return data;
};

export const challengeLike = async (challengeIdData: {
  challengeId: number;
}) => {
  const { data } = await withTokenApi.post(
    "/challengeLike/like",
    challengeIdData
  );
  return data;
};

export const hobbySearch = async (query: string) => {
  const { data } = await withTokenApi.get(`/hobby/search/${query}`);
  return data;
};

export const hobbyExist = async (name: string) => {
  const { data } = await withTokenApi.get(`/hobby/exist/${name}`);
  return data;
};

export const setHobby = async (hobby: { name: string }) => {
  const { data } = await withTokenApi.post("/hobby/save", hobby);
  return data;
};

// 한줄평 관련
export const fetchReview = async (challengeId: number) => {
  const { data } = await withTokenApi.get(`/review/${challengeId}`);
  return data;
};

export const reviewAdd = async (reviewData: {
  reviewContent: string;
  rate: number;
  memberId: number;
  challengeId: number;
}) => {
  const { data } = await withTokenApi.post("/review/register", reviewData);
  return data;
};

export const reviewUpdate = async (
  reviewData: {
    reviewId: number;
    reviewContent: string;
    rate: number;
  },
  challengeId: number
) => {
  const { data } = await withTokenApi.put(`/review/${challengeId}`, reviewData);
  return data;
};

export const reviewDelete = async (id: number) => {
  const { data } = await withTokenApi.delete(`/review/${id}`);
  return data;
};

// 스테이지 관련
export const stageAdd = async (
  stageAddData: StageSaveState,
  challengeId: number
) => {
  const { data } = await withTokenApi.post(
    `/stage/${challengeId}`,
    stageAddData
  );
  return data;
};

export const stageDelete = async (id: number | null) => {
  const { data } = await withTokenApi.delete(`/stage/${id}`);
  return data;
};

export const stageUpdate = async (
  stageUpdateData: StageSaveState,
  id: number
) => {
  const { data } = await withTokenApi.put(`/stage/${id}`, stageUpdateData);
  return data;
};

export const fetchStages = async (ChallengeId: number) => {
  const { data } = await withTokenApi.get(`/stage/${ChallengeId}`);
  return data;
};

// 포스팅 관련
export const postAdd = async () => {
  const { data } = await withTokenApi.post(`/stage/post`);
  return data;
};

export const postDelete = async (post_id: number) => {
  const { data } = await withTokenApi.delete(`/stage/post/${post_id}`);
  return data;
};

export const postUpdate = async (post_id: number) => {
  const { data } = await withTokenApi.put(`/stage/post/${post_id}`);
  return data;
};

export const postRead = async (stageId: number) => {
  const { data } = await withTokenApi.get(`/stage/post/${stageId}`);
  return data;
};

// 댓글 관련
export const commentRead = async (post_id: number) => {
  const { data } = await withTokenApi.get(`/comment/${post_id}`);
  return data;
};
export const commentAdd = async (comment: CommentSend) => {
  const { data } = await withTokenApi.post(`/comment/register`, comment);
  return data;
};

export const commentDelete = async (comment_id: number) => {
  const { data } = await withTokenApi.delete(`/comment/${comment_id}`);
  return data;
};

export const commentUpdate = async (
  comment_id: number,
  comment: CommentSend
) => {
  const { data } = await withTokenApi.put(`/comment/${comment_id}`, comment);
  return data;
};

// 사용법 - 해당 axios는 기본적으로 토큰이 만료되었을 경우 refresh를 겸함.

// GET
// import Api from "lib/customApi.ts";

// const getInfo = async (email: string, pw: string) => {
//     const { data } = await Api.get("/auth/getInfo");
//     return data;
//   }

////////////////////////////////////////////////////////////////////////

//POST
// import Api from "lib/customApi.ts";

// const postParam: object = {
//   enteredId: "test111",
//   enteredPw: '1234'
// }

// const login = async (postParam: object) => {
//     const { data } = await Api.post("/account/login", postParam)
//     return data
// }
