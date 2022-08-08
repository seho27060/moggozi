import React, { useEffect, useState } from "react";
import { stageImgFetchAPI } from "../../lib/imgApi";
import { imgState, StageState } from "../../store/stage";

const StageItem: React.FC<{
  stage: StageState;
}> = ({ stage }) => {
  const [getStage, setStage] = useState<StageState>(stage);
  useEffect(() => {
    stageImgFetchAPI(stage.id!)
      .then((res) => {
        setStage({ ...getStage, img: res });
      })
      .catch((err) => {
        setStage({ ...getStage, img: [] });
      });
  }, [stage, getStage]);
  return (
    <div>
      <h4>스테이지 아이템</h4>
      <p>스테이지 이름 : {stage.name}</p>
      <p>스테이지 내용 : {stage.content}</p>
      <ul>
        {Array.isArray(getStage.img) &&
          getStage.img.map((img: imgState) => {
            return (
              <li>
                <img src={img.url!} alt="img" />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default StageItem;
