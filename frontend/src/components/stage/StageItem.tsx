import React from "react";
import { StageState } from "../../store/stage";

const StageItem: React.FC<{
  stage: StageState;
}> = ({ stage }) => {
  return (
    <div>
      <p>스테이지 아이템</p>
      <p>스테이지 번호 : {stage.challengeId}</p>
      <p>스테이지 이름 : {stage.name}</p>
      <p>스테이지 순서 : {stage.postOrder}</p>
      <p>스테이지 기간 : {stage.period}</p>
      <p>스테이지 내용 : {stage.content}</p>
      <img src={stage.stageImg} alt="img" />
    </div>
  );
};
export default StageItem;
