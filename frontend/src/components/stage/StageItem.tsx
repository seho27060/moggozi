import React from "react";
import { Stage } from "../../store/stage";

// interface StageProps {
//   stage:{
//     challenge_id: number | null;
//     name: string | null;
//     period: number | null;
//     content: string | null;
//     stage_img: string | undefined;
//     order: number | null;

//   }
// }

const StageItem: React.FC<{
  stage: Stage;
}> = ({ stage }) => {

  return (
    <div >
      <p>스테이지 아이템</p>
      <p>스테이지 번호 : {stage.challenge_id}</p>
      <p>스테이지 이름 : {stage.name}</p>
      <p>스테이지 순서 : {stage.order}</p>
      <p>스테이지 기간 : {stage.period}</p>
      <p>스테이지 내용 : {stage.content}</p>
      <img src={stage.stage_img} alt="img" />
    </div>
  );
};
export default StageItem;
