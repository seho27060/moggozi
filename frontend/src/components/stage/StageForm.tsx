import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStages, stageAdd } from "../../lib/withTokenApi";
import { stageFetch } from "../../store/stage";

import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";

import styles from "./StageForm.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const StageForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<ReactQuill>();
  const { challengeId } = useParams();
  const stages = useSelector((state: RootState) => state.stages);

  function stageSubmitHandler(event: React.FormEvent) {
    event.preventDefault();

    if (stages.length > 10) {
      alert("스테이지의 개수는 10개까지 입니다.");
      return;
    }

    const stageData = {
      name: nameInputRef.current!.value,
      content: contentInputRef.current!.value,
      img: "",
    };
    if (!stageData.name) {
      alert("스테이지 제목이 필요합니다.");
      return;
    }
    if (!stageData.content) {
      alert("스테이지 본문이 필요합니다.");
      return;
    }

    stageAdd(stageData, Number(challengeId!))
      .then((res) => {
        fetchStages(Number(challengeId!))
          .then((res) => {
            alert("스테이지 생성이 완료되었습니다.");
            dispatch(stageFetch(res));
            closeModal();
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
        <form className={styles.stageForm}>
          <div>
            <label htmlFor="name">name :</label>
            <input type="text" required id="name" ref={nameInputRef} />
          </div>
          <div>
            <EditorComponent QuillRef={contentInputRef} value={""} />
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
