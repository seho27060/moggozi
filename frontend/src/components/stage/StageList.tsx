import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPostingStageId } from "../../store/post";
import { StageState } from "../../store/stage";
import StageItem from "./StageItem";
const StageList: React.FC<{ stages: StageState[] }> = ({ stages }) => {
  const dispatch = useDispatch()
  const [showStageId, setShowStageId] = useState(stages[0].id);

  const stageSelectHandler = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    setShowStageId(id);
    dispatch(setPostingStageId(id))
  };
  return (
    <div>
      <ul>
        {stages.map((stage, index) => (
          <li key={stage.id}>
            <button onClick={(e) => stageSelectHandler(e, stage.id!)}>
              스테이지 {index + 1}
            </button>
            {showStageId && showStageId === stage.id! && (
              <StageItem stage={stage} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default StageList;
