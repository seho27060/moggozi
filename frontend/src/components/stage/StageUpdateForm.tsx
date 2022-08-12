import React, { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStages, stageUpdate } from "../../lib/withTokenApi";
import { stageFetch, StageState } from "../../store/stage";
import StageImgForm from "./StageImgForm";

import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";

import styles from "./StageUpdateForm.module.scss"
// 수정하기가 글쓴이가 수정할 수 있도록 해야함.

const StageUpdateForm: React.FC<{
  stage: StageState;
}> = ({ stage }) => {
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
        alert("스테이지 수정이 완료되었습니다.");
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

  const imgHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsImgUpdate(!isImgUpdate);
  };

  return (
    <div>
      StageUpdateForm
      {isImgUpdate ? (
        <div>
          <StageImgForm stage={stage} />
          <button onClick={imgHandler}>내용 수정</button>
        </div>
      ) : (
        <div>
          <form className={styles.stageUpdateForm}>
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
            <div>
            <EditorComponent QuillRef={contentInputRef} value={stage.content!}/>
            </div>
            <button onClick={stateUpdateHandler}>수정</button>
          </form>
          <button onClick={imgHandler}>이미지 수정</button>
        </div>
      )}
    </div>
  );
};

export default StageUpdateForm;
