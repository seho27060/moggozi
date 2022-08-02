// import type { RootState } from "../../store/store";
// import { useSelector } from "react-redux";

import { userDetail } from "../../lib/withTokenApi"

import { useState } from "react"

function UserPage() {
  
  const [ nickname, setNickname ] = useState("")
  const [ introduce, setIntroduce ] = useState("")
  const [ userImg, setUserImg ] = useState("")


  userDetail()
    .then((res) => {
      console.log(res);
      setNickname(res.nickname)
      setIntroduce(res.introduce)
      setUserImg(res.userImg)
    }).catch((err) => {
      // alert("오류가 발생했습니다.")
      console.log(err)
    })
  console.log(userDetail())

  return (
    <div>
      <ul>
        <li>닉네임 : {nickname}</li>
        <li>자기소개 : {introduce}</li>
        <li>프로필사진 : {userImg}</li>
      </ul>
      UsersPage
    </div>
  );
}

export default UserPage;
