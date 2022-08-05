import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { challengeDelete } from "../../lib/withTokenApi";

const ChallengeDeleteBtn: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const deleteHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const isChk = window.confirm("정말 삭제하시겠습니까?");
    if (isChk) {
      challengeDelete(Number(id))
        .then((res) => {
          console.log("삭제 완료");
          navigate("/", { replace: true }); // 메인 페이지로 이동 후 뒤로가기가 안 먹도록
        })
        .catch((err) => {
          alert(err.response);
        });
    }
  };
  return <button onClick={deleteHandler}>챌린지 삭제</button>;
};

export default ChallengeDeleteBtn;
