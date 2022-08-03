import React, { useRef } from "react";

function StageForm() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const periodInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const orderInputRef = useRef<HTMLInputElement>(null);

  function stageSubmitHandler(event: React.FormEvent) {
    event.preventDefault();

    const enteredName = nameInputRef.current!.value;
    const enteredPeriod = periodInputRef.current!.value;
    const enteredContent = contentInputRef.current!.value;
    const enteredStageImg = imgInputRef.current!.value;
    const enteredOrder = orderInputRef.current!.value;

    const stageData = {
      name: enteredName,
      period: enteredPeriod,
      content: enteredContent,
      stage_img: enteredStageImg,
      order: enteredOrder,
    };
    console.log(stageData);
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
            <label htmlFor="period">period :</label>
            <input type="text" required id="period" ref={periodInputRef} />
          </div>
          <div>
            <label htmlFor="content">content :</label>
            <textarea required id="content" ref={contentInputRef} />
          </div>
          <div>
            <label htmlFor="stage_img">stage_img :</label>
            <input type="text" required id="stage_img" ref={imgInputRef} />
          </div>
          <div>
            <label htmlFor="order">order :</label>
            <input type="text" required id="order" ref={orderInputRef} />
          </div>
          <button type="button" onClick={stageSubmitHandler}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
export default StageForm;
