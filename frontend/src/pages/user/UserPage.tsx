// import type { RootState } from "../../store/store";
// import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useState } from "react"

import { userDetail } from "../../lib/withTokenApi"

import MypageFollow from "../../components/accounts/MypageFollow";

function UserPage() {
  // const userId = Number(useParams())
  const [ nickname, setNickname ] = useState("")
  const [ introduce, setIntroduce ] = useState("")
  const [ userImg, setUserImg ] = useState("")


  userDetail()
    .then((res) => {
      setNickname(res.nickname)
      setIntroduce(res.introduce)
      setUserImg(res.userImg)
    }).catch((err) => {
      // alert("오류가 발생했습니다.")
      console.log(err)
    })

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
    <MypageFollow />
    </div>
  );
}

export default UserPage;
