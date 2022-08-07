import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { otheruserDetail } from "../../lib/generalApi";
import { followApi } from "../../lib/withTokenApi";

import MypageFollow from "../../components/accounts/MypageFollow";

function UserPage() {
  const userId = Number(useParams().id);
  // console.log(userId)

  const loginData = useSelector((state: RootState) => state.auth);
  const loginId = loginData.userInfo.id;

  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [userImg, setUserImg] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [followedCnt, setFollowedCnt ] = useState(0);
  const [followingCnt, setFollowingCnt] = useState(0);
  const [followState, setFollowState] = useState(false);

  otheruserDetail(userId, loginData.userInfo.id)
    .then((res) => {
      // console.log(res)
      setNickname(res.nickname);
      setIntroduce(res.introduce);
      setUserImg(res.userImg);
      setIsPrivate(res.isPrivate);
      setFollowState(res.isFollowing);
      setFollowedCnt(res.followedCnt);
      setFollowingCnt(res.followingCnt);
    })
    .catch((err) => {
      // alert("오류가 발생했습니다.")
      console.log(err);
    });

  function followHandler(event: React.MouseEvent) {
    event.preventDefault();
    setFollowState(!followState);
    followApi(userId)
      .then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Link to={"/account/userUpdate"}>회원정보 수정</Link>
      UsersPage
      <Link to={``}>
        <button>챌린지 생성</button>
      </Link>
      <ul>
        <li>닉네임 : {nickname}</li>
        <li>자기소개 : {introduce}</li>
        <li>프로필사진 : {userImg}</li>
      </ul>
      <MypageFollow followedCnt={followedCnt} followingCnt={followingCnt} />
      {loginData.isLoggedIn ? (
        <div>
          {loginId === userId ? ("") : (<button onClick={followHandler}> {followState ? "언팔로우" : "팔로우"}
            </button>
          )}
        </div>
      ) : (
        <div></div>
      )}
      {isPrivate ? <div>블러 처리 가림막</div> : <div>보여주기</div>}
    </div>
  );
}

export default UserPage;
