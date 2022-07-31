// JWT token refresh작업을 하는 곳.
// (accessToken 과 토큰 만료시간은 로컬 스토리지, refreshToken 은 httpOnly cookie 에 저장되어 있다고 가정합니다.)


import axios, { AxiosRequestConfig } from "axios";
import Cookie from "js-cookie";
// import { RefreshTokenResponse } from 'util/types/Response';
import { apiConfig } from "../config"
import moment from "moment";

const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const refreshToken = Cookie.get("refreshToken");
  const expireAt = localStorage.getItem("expiresAt");
  let token = localStorage.getItem("accessToken");

  // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때 => 토큰 만료 응답이 왔을 경우로 바꿔야 함
  if (moment(expireAt).diff(moment()) < 0 && refreshToken) {
    const body = {
      refreshToken,
    };

    // 토큰 갱신 서버통신 // 토큰 갱신 주소 수정 필요.
    const { data } = await axios.post(`${apiConfig.apiRoot}/auth/token`, body);

    token = data.data.accessToken;
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem(
      "expiresAt",
      moment().add(1, "hour").format("yyyy-MM-DD HH:mm:ss")
    );
  }
  
  if (!config?.headers) {
    throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
  }

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
};

const refreshErrorHandle = (err: any) => {
  Cookie.remove("refreshToken")
}

export { refresh, refreshErrorHandle }
