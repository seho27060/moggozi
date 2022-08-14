import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStages, stageAdd } from "../../lib/withTokenApi";
import { stageFetch } from "../../store/stage";

import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";

import styles from "./StageForm.module.scss";
const StageForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<ReactQuill>();
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
