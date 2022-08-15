import React, { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStages, stageUpdate } from "../../lib/withTokenApi";
import { stageFetch, StageState } from "../../store/stage";
import StageImgForm from "./StageImgForm";

import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";

import styles from "./StageUpdateForm.module.scss";
// 수정하기가 글쓴이가 수정할 수 있도록 해야함.

const StageUpdateForm: React.FC<{
  stage: StageState;
  closeModal: () => void;
}> = ({ stage, closeModal }) => {
  const [isImgUpdate, setIsImgUpdate] = useState(false);
  const dispatch = useDispatch();
  const contentInputRef = useRef<ReactQuill>();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { challengeId } = useParams();

  function stateUpdateHandler(event: FormEvent) {
    event.preventDefault();
    const stageUpdateData = {
      name: nameInputRef.current!.value,
      content: contentInputRef.current!.value,
      img: "",
    };
    stageUpdate(stageUpdateData, stage.id!) // DB 값 변경
      .then((res) => {
        fetchStages(Number(challengeId!))
          .then((res) => {
            alert("스테이지 수정이 완료되었습니다.");
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

  const imgHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsImgUpdate(!isImgUpdate);
  };

  return (
    <div>
      {isImgUpdate ? (
        <div>
          <StageImgForm stage={stage} />
          <div className={styles.completeEdit}>
            <button onClick={imgHandler}>수정 완료</button>
          </div>
        </div>
      ) : (
        <div>
          <form className={styles.stageUpdateForm}>
            <div>
              <input
                className={styles.input}
                type="text"
                required
                id="name"
                defaultValue={stage.name || ""}
                ref={nameInputRef}
                placeholder="스테이지 제목을 입력해주세요."
                autoComplete="off"
              />
            </div>
            <div>
              <EditorComponent
                QuillRef={contentInputRef}
                value={stage.content!}
              />
            </div>
          </form>
          <div className={styles.buttons}>
            <button onClick={imgHandler}>이미지 수정</button>
            <button onClick={stateUpdateHandler}>수정 완료</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StageUpdateForm;
