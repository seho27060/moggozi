// stage store에서 스테이지 번호를 갱신하고..접근해야하ㅡ나?

import { Stage } from "../../pages/stage/StageMain";
import { GoBackButton } from "../../layout/HistoryButton";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";

import styled from "styled-components";
import Modal from "../ui/Modal";
const StageDetailItem: React.FC<{ stage: Stage }> = ({ stage }) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const OnClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <Main>
      StageDetail
      <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
        <h2>{stage.stage_id}번 stage item 입니다.</h2>
        <p>{stage.challenge_id}</p>
        <p>{stage.name}</p>
        <p>{stage.order}</p>
        <p>{stage.period}</p>
        <p>{stage.content}</p>
        <img src={stage.stage_img} alt="img" />
        <GoBackButton />
        <Link
          to={`/stage/${stage.stage_id}/update`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <button>수정하기</button>
        </Link>
        <button onClick={OnClickToggleModal}>삭제하기</button>
        <div>
          {isOpenModal && (
            <Modal onClickToggleModal={OnClickToggleModal}>
              <h1>werqerㄷㅇㄴㄴㅇㄹ</h1>
            </Modal>
          )}
        </div>
      </div>
    </Main>
  );
};

export default StageDetailItem;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;