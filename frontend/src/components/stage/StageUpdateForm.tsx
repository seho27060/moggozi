import { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { stageUpdate } from "../../lib/withTokenApi";
import { StageState, updateStage } from "../../store/stage";

// 수정하기가 글쓴이가 수정할 수 있도록 해야함.

const StageUpdateForm: React.FC<{ stage: StageState }> = ({ stage }) => {
  const dispatch = useDispatch();
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const stageImgInputRef = useRef<HTMLInputElement>(null);

  function stateUpdateHandler(event: FormEvent) {
    event.preventDefault();
    const stageUpdateData = {
      name: nameInputRef.current!.value,
      // estimatedDay: Number(estimateDayInputRef.current!.value),
      // estimatedTime: Number(estimateTimeInputRef.current!.value),
      content: contentInputRef.current!.value,
      stageImg: stageImgInputRef.current!.value,
    };
    stageUpdate(stageUpdateData, stage.id!) // DB 값 변경
      .then((res) => {
        console.log(res);
        alert("스테이지 수정이 완료되었습니다.");
        dispatch(updateStage(res)); // 리덕스 값 변경
      })
      .catch((err) => {
        alert(err.response);
      });
  }
  return (
    <div>
      StageUpdateForm
      <div>
        <form>
          <div>
            <label htmlFor="name">스테이지 이름 :</label>
            <input
              type="text"
              required
              id="name"
              defaultValue={stage.name || ""}
              ref={nameInputRef}
            />
          </div>
          {/* <div>
            <p>예상 소요 시간</p>
            <label htmlFor="day">Day :</label>
            <input
              type="text"
              required
              id="day"
              defaultValue={stage.estimatedDay || ""}
              ref={estimateDayInputRef}
            />
            <label htmlFor="time">Hour :</label>
            <input
              type="text"
              required
              id="time"
              defaultValue={stage.estimatedTime || ""}
              ref={estimateTimeInputRef}
            />
          </div> */}
          <div>
            <label htmlFor="content">스테이지 설명 :</label>
            <textarea
              required
              id="content"
              defaultValue={stage.content || ""}
              ref={contentInputRef}
              rows={5}
            />
          </div>
          <div>
            <label htmlFor="stageImg">사진 첨부 :</label>
            <input
              type="text"
              required
              id="stageImg"
              defaultValue={stage.stageImg || ""}
              ref={stageImgInputRef}
            />
          </div>
          <button onClick={stateUpdateHandler}>submit</button>
        </form>
      </div>
    </div>
  );
};

export default StageUpdateForm;
