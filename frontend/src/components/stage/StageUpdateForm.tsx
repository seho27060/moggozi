import { FormEvent, useRef } from "react";
import { Stage } from "../../pages/stage/StageMain";
// 수정하기가 글쓴이가 수정할 수 있도록 해야함.

// interface updateStageState {
//   stage_id: number;
//   challenge_id: number | null;
//   name: string | null;
//   period: number | null;
//   content: string | null;
//   stage_img: string | undefined;
//   order: number | null;
//   children?: React.ReactNode;
// }

const StageUpdateForm: React.FC<{ stage: Stage }> = ({ stage }) => {
  const contentInputRef = useRef<HTMLTextAreaElement>(
    stage.content as unknown as HTMLTextAreaElement
  );
  const periodInputRef = useRef<HTMLInputElement>(
    stage.period as unknown as HTMLInputElement
  );
  const nameInputRef = useRef<HTMLInputElement>(
    stage.name as unknown as HTMLInputElement
  );
  const stageImgInputRef = useRef<HTMLInputElement>(
    stage.stage_img as unknown as HTMLInputElement
  );
  const orderInputRef = useRef<HTMLInputElement>(
    stage.order as unknown as HTMLInputElement
  );

  function stateUpdateHandler(event: FormEvent) {
    event.preventDefault();
    const stageUpdateData: Stage = {
      challenge_id: stage.challenge_id,
      content: contentInputRef.current!.value,
      name: nameInputRef.current!.value,
      order: Number(orderInputRef.current!.value),
      period: Number(periodInputRef.current!.value),
      stage_id: stage.stage_id,
      stage_img: stageImgInputRef.current!.value,
    };

    // 수정 반영된 data를 api로 서버에 전달.
    console.log(stageUpdateData);
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
              defaultValue={stage.name as string | undefined}
              ref={nameInputRef}
            />
          </div>
          <div>
            <label htmlFor="period">스테이지 기간 :</label>
            <input
              type="text"
              required
              id="period"
              defaultValue={stage.period as number | undefined}
              ref={periodInputRef}
            />
          </div>
          <div>
            <label htmlFor="content">스테이지 설명 :</label>
            <textarea
              required
              id="content"
              defaultValue={stage.content as string | undefined}
              ref={contentInputRef}
              rows = {5}
            />
          </div>
          <div>
            <label htmlFor="stage_img">사진 첨부 :</label>
            <input
              type="text"
              required
              id="stage_img"
              defaultValue={stage.stage_img as string | undefined}
              ref={stageImgInputRef}
            />
          </div>
          <div>
            <label htmlFor="order">스테이지 순서 :</label>
            <input
              type="text"
              required
              id="order"
              defaultValue={stage.order as number | undefined}
              ref={orderInputRef}
            />
          </div>
          <button onClick={stateUpdateHandler}>submit</button>
        </form>
      </div>
    </div>
  );
};

export default StageUpdateForm;
