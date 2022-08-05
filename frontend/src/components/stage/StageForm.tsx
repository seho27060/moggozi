import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { stageAdd } from "../../lib/withTokenApi";
import { addStage, StageState } from "../../store/stage";

const StageForm: React.FC<{ stage: StageState }> = ({ stage }) => {
  const dispatch = useDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const stageImgInputRef = useRef<HTMLInputElement>(null);

  function stageSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    const stageData = {
      name: nameInputRef.current!.value,
      content: contentInputRef.current!.value,
      stageImg: stageImgInputRef.current!.value,
    };
    stageAdd(stageData, stage.id!).then((res) => {
      alert("스테이지 생성이 완료되었습니다.");
      dispatch(addStage(stageData));
    });
  }
  return (
    <div>
      <h3>Stage Form</h3>
      <div>
        <form>
          <div>
            <label htmlFor="name">name :</label>
            <input type="text" required id="name" ref={nameInputRef} />
          </div>
          <div>
            <label htmlFor="content">content :</label>
            <textarea required id="content" ref={contentInputRef} />
          </div>
          <div>
            <label htmlFor="stage_img">stage_img :</label>
            <input type="text" required id="stage_img" ref={stageImgInputRef} />
          </div>
          <button type="button" onClick={stageSubmitHandler}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default StageForm;
