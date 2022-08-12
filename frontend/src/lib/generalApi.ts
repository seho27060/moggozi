import axios from "axios";
import { apiConfig } from "../config";

// 토큰이 필요없는 axios
const generalApi = axios.create({
  baseURL: apiConfig.apiRoot,
  timeout: 10000,
  params: {},
});

export const signUpApi = async (option: object) => {
  const { data } = await generalApi.post("/user/register", option);
  return data;
};

export const loginApi = async (option: object) => {
  const { data } = await generalApi.post("/user/login", option);
  return data;
};

export const checkId = async (email: string) => {
  const { data } = await generalApi.post(`/user/idcheck/${email}`);
  return data;
};

export const checkNickname = async (nickname: string | undefined) => {
  const { data } = await generalApi.post(`/user/nickcheck/${nickname}`);
  return data;
};

export const passwordReissue = async (option: object) => {
  const { data } = await generalApi.post("/user/resetpw", option);
  return data;
};

export const otherUserDetail = async (
  userId: number | null,
  loginId: number | null
) => {
  const { data } = await generalApi.get(`/user/profile/${userId}/${loginId}`);
  return data;
};

// 챌린지
export const fetchChallengeRankList = async () => {
  const { data } = await generalApi.get("/challenge/rank");
  return data;
};

export const fetchChallenge = async (id: number) => {
  const { data } = await generalApi.get(`/challenge/${id}`);
  return data;
};

// 검색
export const searchUserApi = async (q: string, page: number, size: number) => {
  const { data } = await generalApi.get(
    `/user/search/pagination/?keyword=${q}&page=${page}&size=${size}`
  );
  return data;
};

export const searchChallengeApi = async (
  q: string,
  page: number,
  size: number
) => {
  const { data } = await generalApi.get(
    `/challenge/search/?keyword=${q}&page=${page}&size=${size}`
  );
  return data;
};

export const searchChallengeHobbyApi = async (
  q: string,
  page: number,
  size: number
) => {
  const { data } = await generalApi.get(
    `/challenge/tag/search/?keyword=${q}&page=${page}&size=${size}`
  );
  return data;
};
// 사용법 - 토큰이 필요없는 일반 axios 요청을 사용할 때 이용
// 위에서 기본 generalApi를 이용하여 사용하고자 하는 axios를 loginApi와 같이
// 만들어준 뒤, 해당 api를 export하고 사용하고자 하는 component에서 불러와 사용하면 됨.

// GET
// import Api from "lib/generalApi.ts";

// const getInfo = async () => {
//     const response = await generalApi.get("/auth/getInfo");
//     return response;
// }
// getInfo().then((res) => {
//     console.log(res)
// })

////////////////////////////////////////////////////////////////////////

// data를 담아 보내기

//POST
// import Api from "lib/generalApi.ts";

// const option: object = {
//   enteredId: "test111",
//   enteredPw: '1234'
// }

// const login = async (option: object) => {
//     const { data } = await Api.post("/account/login", option)
//     return data
// }
// login().then((res) => {
//     console.log(res.id)
// })
