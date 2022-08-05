import React from "react";
import { StageState } from "../../store/stage";

const StageItem: React.FC<{
  stage: StageState;
}> = ({ stage }) => {
  return (
    <div>
      <h4>스테이지 아이템</h4>
      <p>스테이지 이름 : {stage.name}</p>
      {/* <p>스테이지 순서 : {stage.order}</p> */}
      {/* <p>
        스테이지 기간 : {stage.estimatedDay} : {stage.estimatedDay}
      </p> */}
      <p>스테이지 내용 : {stage.content}</p>
      <img src={stage.img} alt="img" />
    </div>
  );
};
export default StageItem;
