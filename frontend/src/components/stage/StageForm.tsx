import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStages, stageAdd } from "../../lib/withTokenApi";
import { stageFetch } from "../../store/stage";

const StageForm: React.FC = () => {
  const dispatch = useDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const { challengeId } = useParams();
  function stageSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    const stageData = {
      name: nameInputRef.current!.value,
      content: contentInputRef.current!.value,
      img: "",
    };
    stageAdd(stageData, Number(challengeId!))
      .then((res) => {
        alert("스테이지 생성이 완료되었습니다.");
        fetchStages(Number(challengeId!))
          .then((res) => {
            dispatch(stageFetch(res));
          })
          .catch((err) => {
            alert(err.response);
          });
      })
      .catch((err) => {
        alert(err.response);
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
          <button type="button" onClick={stageSubmitHandler}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default StageForm;
