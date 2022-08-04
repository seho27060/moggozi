import { FormEvent, useRef } from "react";
import { GoBackButton } from "../../layout/HistoryButton";
import { StageState } from "../../store/stage";

// 수정하기가 글쓴이가 수정할 수 있도록 해야함.

const StageUpdateForm: React.FC<{ stage: StageState }> = ({ stage }) => {
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
    stage.stageImg as unknown as HTMLInputElement
  );
  const orderInputRef = useRef<HTMLInputElement>(
    stage.postOrder as unknown as HTMLInputElement
  );

  function stateUpdateHandler(event: FormEvent) {
    event.preventDefault();
    const stageUpdateData: StageState = {
      challengeId: stage.challengeId,
      content: contentInputRef.current!.value,
      name: nameInputRef.current!.value,
      postOrder: Number(orderInputRef.current!.value),
      period: Number(periodInputRef.current!.value),
      id: stage.id,
      stageImg: stageImgInputRef.current!.value,
      createDate: stage.createDate,
      modifiedDate: stage.modifiedDate,
      postList: stage.postList,
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
              rows={5}
            />
          </div>
          <div>
            <label htmlFor="stage_img">사진 첨부 :</label>
            <input
              type="text"
              required
              id="stage_img"
              defaultValue={stage.stageImg as string | undefined}
              ref={stageImgInputRef}
            />
          </div>
          <div>
            <label htmlFor="order">스테이지 순서 :</label>
            <input
              type="text"
              required
              id="order"
              defaultValue={stage.postOrder as number | undefined}
              ref={orderInputRef}
            />
          </div>
          {/* 뒤로가기시 오류 있음. */}
          <GoBackButton />
          <button onClick={stateUpdateHandler}>submit</button>
        </form>
      </div>
    </div>
  );
};

export default StageUpdateForm;
