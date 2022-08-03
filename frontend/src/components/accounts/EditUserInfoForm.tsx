// 박세호, 인증 유저에 대한 접근 추가 필요, 수정정보 요청, 요청성공시 메인페이지로 이동.

// 비인증 사용자에 대한 url 접근 막아야함.
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
// import { RootState } from "../../store/store";
// import { useSelector } from "react-redux";

// html input 태그에서 value의 type에 null이 매칭이 안되서 임의로 undefined로 수정하였습니다.
interface UserEditState {
  user_id: number | undefined;
  email: string | undefined;
  username: string | undefined;
  nickname: string | undefined;
  introduce: string | undefined;
  is_private: boolean | undefined; // html상의 type이 매칭이 안되서 임의로 number => boolean 로 수정하였습니다.
  img: string | undefined;
  state: number | undefined;
  password: string | undefined;
}

const EditUserInfoForm: React.FC = () => {
  // 성공이후 페이지이동을 위한 navigate 객체 생성
  const navigate = useNavigate()
  
  // 로그인 상태라면, 현재 로그인 유저의 회원정보 가져오기. 기능이 없으므로 아래 더미데이터를 활용.
  // const currentState = useSelector((state: RootState) => state);
  // 현재 유저 정보를 복사해오기. 가져온 데이터에 수정사항 반영하여 회원정보 수정요청
  const currentState: UserEditState = {
    email: "ssafy1234@ssafy.com",
    password: "ssafy12345",
    user_id: 12345,
    username: "DUMMY",
    nickname: "DUMDUMMY",
    introduce: "this is dummy data",
    is_private: false, // html상의 type이 매칭이 안되서 임의로 boolean 으로 수정하였습니다.
    img: "https://w7.pngwing.com/pngs/813/578/png-transparent-emoji-sunglasses-t-shirt-smiley-emoticon-emoji-face-orange-smiley.png",
    state: 0,
  };
  const [userState, setUserState] = useState(currentState);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    // axios({
    //   method: 'POST',
    //   url: '대충 회원수정 API url 요청',
    //   data: {
    //        useState 정보 보내기.
    //     // ...대충 수정 데이터 포함
    //     // 입력받은 수정 회원 정보를 api에 요청하여 사용자의 정보 수정
    //   }
    // }).then((response) => (
    //   // 요청사항 성공시 변경데이터로 현재 사용자 정보 갱신
    //   // fetch  user data
    //   navigate('/', {replace : true})
    // )).catch((error) => (
    //   console.log(error)
    // ))
    console.log(userState);
    navigate("/", {replace : true})
  }

  return (
    <div>
      <h3>EditUserInfoForm form</h3>
      <div>
        <form>
          <div>
            <label htmlFor="email">email : </label>
            <input
              type="text"
              required
              id="email"
              value={userState.email}
              onChange={(event) => {
                setUserState({ ...userState, email: event.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="password">password : </label>
            <input
              type="text"
              required
              id="password"
              value={userState.password}
              onChange={(event) => {
                setUserState({ ...userState, password: event.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="username">username : </label>
            <input
              type="text"
              required
              id="username"
              value={userState.username}
              onChange={(event) => {
                setUserState({ ...userState, username: event.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="nickname">nickname : </label>
            <input
              type="text"
              required
              id="nickname"
              value={userState.nickname}
              onChange={(event) => {
                setUserState({ ...userState, nickname: event.target.value });
              }}
            />
          </div>{" "}
          <div>
            <label htmlFor="introduce">introduce : </label>
            <textarea
              required
              id="introduce"
              value={userState.introduce}
              onChange={(event) => {
                setUserState({ ...userState, introduce: event.target.value });
              }}
            />
          </div>{" "}
          <div>
            <label htmlFor="is_private">is_private : </label>
            <input
              type="checkbox"
              required
              checked = {userState.is_private}
              id="is_private"
              onChange={(event) => {
                let prevIsPrivate = userState.is_private
                if (prevIsPrivate) {
                  prevIsPrivate = false
                } else {
                  prevIsPrivate = true
                }
                setUserState({ ...userState, is_private: prevIsPrivate });
              }}
            />
          </div>{" "}
          <div>
            <img src={userState.img} alt="user Img" />
            <label htmlFor="img">img : </label>
            <input
              type="text"
              required
              id="img"
              value={userState.img}
              onChange={(event) => {
                setUserState({ ...userState, img: event.target.value });
              }}
            />
          </div>{" "}
          <div>
            <label htmlFor="state">state : </label>
            <input
              type="text"
              required
              id="state"
              value={userState.state}
              onChange={(event) => {
                setUserState({ ...userState, state: Number(event.target.value) });
              }}
            />
          </div>
          <button type="button" onClick={submitHandler}>
            Change my Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserInfoForm;
