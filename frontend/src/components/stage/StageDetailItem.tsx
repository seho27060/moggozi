// stage store에서 스테이지 번호를 갱신하고..접근해야하ㅡ나?

import { GoBackButton } from "../../layout/HistoryButton";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import Modal from "../ui/Modal";
import PostList from "../post/PostList";
import { StageDetailType } from "../../pages/stage/StageDetail";

const StageDetailItem: React.FC<{ stage: StageDetailType }> = ({ stage }) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const OnClickToggleModal = useCallback(() => {
    console.log(isOpenModal);
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  function removeHandler () {
    console.log("현재 스테이지를 삭제합니다.")
    return <div></div>;
  };
  
  return (
    <div>
      StageDetail
      <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
        <h2>{stage.stage_id}번 stage item 입니다.</h2>
        <p>{stage.challenge_id}</p>
        <p>{stage.name}</p>
        <p>{stage.order}</p>
        <p>{stage.period}</p>
        <p>{stage.content}</p>
        <img src={stage.stage_img} alt="img" />
      </div>
      <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
        <PostList postings= {stage.postings}/>
      </div>
      <div style={{ border: "solid", margin: "1rem", padding: "1rem" }}>
      <GoBackButton />
        <Link
          to={`/stage/${stage.stage_id}/update`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <button>수정하기</button>
        </Link>
        <button onClick={OnClickToggleModal}>삭제하기</button>
        {isOpenModal && (
          <Modal>
            <div>
              정말 삭세하시겠습니까?
              <button onClick={removeHandler}>삭제</button>
              <button onClick={OnClickToggleModal}>취소</button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default StageDetailItem;
