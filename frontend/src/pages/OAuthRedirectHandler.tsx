import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistAuth } from "../lib/withTokenApi";
import { authentication } from "../store/auth"

import Modal from "../components/ui/Modal";

const KakaoOAuthRedirectHandler: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [ openModal, setOpenModal ] = useState(false)

  const closeModal = () => {
    navigate("/account/socialUserUpdate")
  }

  let Token = new URL(window.location.href).searchParams.get("accessToken")
  let isFirst = new URL(window.location.href).searchParams.get("isFirst")

  if(Token != null) {
    sessionStorage.setItem("accessToken", Token);
  } else {
    sessionStorage.setItem("accessToken", "")
  }

  useEffect(() => {
    persistAuth()
    .then((res) => {
      dispatch(authentication(res))
    })
    if (isFirst === "1") {
      setOpenModal(true)
    } else {
      navigate("/")
    }
  }, [dispatch, isFirst, navigate])



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
