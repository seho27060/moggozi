// 박세호, 인증 유저에 대한 접근 추가 필요, 수정정보 요청, 요청성공시 메인페이지로 이동.

// 비인증 사용자에 대한 url 접근 막아야함.
import { RootState } from "../../store/store";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userDetail } from "../../lib/withTokenApi";
import { updateUserApi } from "../../lib/withTokenApi";
import { useSelector } from "react-redux";

// html input 태그에서 value의 type에 null이 매칭이 안되서 임의로 undefined로 수정하였습니다.
interface UserEditState {
  username: string | undefined;
  fullname: string | undefined;
  nickname: string | undefined;
  introduce: string | undefined;
  userImg: string | undefined;
  isPrivate: number | undefined; // html상의 type이 매칭이 안되서 임의로 number => boolean 로 수정하였습니다.
}

const EditUserInfoForm: React.FC = () => {
  // 성공이후 페이지이동을 위한 navigate 객체 생성
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  console.log(userId);

  const [option, setOption] = useState<UserEditState>({
    username: "",
    fullname: "",
    nickname: "",
    introduce: "",
    userImg: "",
    isPrivate: 0,
  });

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    updateUserApi(userId, option);
    // console.log(option);
    navigate("/", { replace: true });
  }

  useEffect(() => {
    if ( isLoggedIn ){
      userDetail().then((res) => {
        const currentState: UserEditState = {
          username: res.username,
          fullname: res.fullname,
          nickname: res.nickname,
          introduce: res.introduce,
          userImg: res.userImg,
          isPrivate: res.isPrivate,
        };
        setOption(currentState);
      })
    } else {
      alert("잘못된 접근입니다.")
      navigate("/")
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h3>EditUserInfoForm form</h3>
      <div>
        <form>
          <div>
            <label htmlFor="email">이메일 : </label>
            <input
              type="text"
              required
              id="email"
              value={option.username}
              onChange={(event) => {
                setOption({ ...option, username: event.target.value });
              }}
            />
          </div>
          <div>
            <Link to={"/account/updatePw"}>비밀번호 변경하기</Link>
          </div>
          <div>
            <label htmlFor="username">이름 : </label>
            <input
              type="text"
              required
              id="username"
              value={option.fullname}
              onChange={(event) => {
                setOption({ ...option, fullname: event.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="nickname">별명 : </label>
            <input
              type="text"
              required
              id="nickname"
              value={option.nickname}
              onChange={(event) => {
                setOption({ ...option, nickname: event.target.value });
              }}
            />
          </div>{" "}
          <div>
            <label htmlFor="introduce">한줄 소개 : </label>
            <textarea
              required
              id="introduce"
              value={option.introduce}
              onChange={(event) => {
                setOption({ ...option, introduce: event.target.value });
              }}
            />
          </div>{" "}
          <div>
            <label htmlFor="is_private">프로필 공개 여부 : </label>
            <input
              type="checkbox"
              required
              checked={!!option.isPrivate}
              id="is_private"
              onChange={(event) => {
                let prevIsPrivate = option.isPrivate;
                if (prevIsPrivate) {
                  prevIsPrivate = 0;
                } else {
                  prevIsPrivate = 1;
                }
                setOption({ ...option, isPrivate: prevIsPrivate });
              }}
            />
          </div>{" "}
          <div>
            <img src={option.userImg} alt="프로필 사진" />
            <label htmlFor="img">프로필 사진 : </label>
            <input
              type="text"
              required
              id="img"
              value={option.userImg}
              onChange={(event) => {
                setOption({ ...option, userImg: event.target.value });
              }}
            />
          </div>{" "}
          <button type="button" onClick={submitHandler}>
            Change my Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserInfoForm;
