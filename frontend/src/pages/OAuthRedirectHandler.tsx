import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistAuth } from "../lib/withTokenApi";
import { authentication } from "../store/auth"
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";

import Modal from "../components/ui/Modal";

const KakaoOAuthRedirectHandler: React.FC = () => {
  // const user = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [ openModal, setOpenModal ] = useState(false)

  const closeModal = () => {
    navigate("/account/socialUserUpdate")
  }

  // let Token = new URL(window.location.href).searchParams.get("accessToken")
  // let isFirst = new URL(window.location.href).searchParams.get("isFirst")

  // if(Token != null) {
  //   sessionStorage.setItem("accessToken", Token);
  // } else {
  //   sessionStorage.setItem("accessToken", "")
  // }

  useEffect(() => {
    let Token = new URL(window.location.href).searchParams.get("accessToken")
    let isFirst = Number(new URL(window.location.href).searchParams.get("isFirst"))
    
    if(Token != null) {
      sessionStorage.setItem("accessToken", Token);
    } else {
      sessionStorage.setItem("accessToken", "")
    }

    console.log(Token)
    console.log(isFirst)

    persistAuth()
    .then((res) => {
      dispatch(authentication(res))
    })


    if (isFirst === 1) {
      setOpenModal(true)
    } else {
      persistAuth()
      .then((res) => {
        navigate("/")
      }).catch((err) => {
        alert("서버 통신에 오류가 발생했습니다. 다시 한번 시도해주세요.")
        navigate("/")
      })
    }
  }, [dispatch, navigate])



  return <div>
    로딩 중 .....
    <Modal open={openModal} close={closeModal} header="안내">
      <div>
        <p>처음 로그인 하셨군요!</p>
        <br />
        <p>추가 정보를 입력해주세요.</p>
      </div>
    </Modal>
  </div>;
};

export default KakaoOAuthRedirectHandler;
