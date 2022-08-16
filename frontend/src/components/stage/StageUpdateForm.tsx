import React, { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStages, stageUpdate } from "../../lib/withTokenApi";
import { stageFetch, StageState } from "../../store/stage";
import StageImgForm from "./StageImgForm";

import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";

import styles from "./StageUpdateForm.module.scss";
import getTextLength from "../../lib/getTextLength";
import Modal from "../ui/Modal";
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
  const [alertText, setAlertText] = useState(<div></div>);
  const [modalOpen, setModalOpen] = useState(false);
  const [titleCnt, setTitleCnt] = useState(stage.name!.length || "");
  const [titleText, setTitleText] = useState(stage.name || "");

  const closeAlertModal = () => {
    document.body.style.overflow = "unset";
    setModalOpen(false);
  };

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const cnt = getTextLength(event.target.value);
    if (cnt > 20 && event.target.value.length > titleText.length) {
      return;
    }
    setTitleCnt(cnt);
    setTitleText(event.target.value);
  };

  function stateUpdateHandler(event: FormEvent) {
    event.preventDefault();

    const stageUpdateData = {
      name: nameInputRef.current!.value,
      content: contentInputRef.current!.value,
      img: "",
    };
    if (!stageUpdateData.name) {
      setAlertText(<div>스테이지 제목이 필요합니다.</div>);
      setModalOpen(true);
      return;
    }
    if (!stageUpdateData.content) {
      setAlertText(<div>스테이지 본문이 필요합니다.</div>);
      setModalOpen(true);
      return;
    }

    stageUpdate(stageUpdateData, stage.id!) // DB 값 변경
      .then((res) => {
        fetchStages(Number(challengeId!)).then((res) => {
          setAlertText(<div>스테이지 수정이 완료되었습니다.</div>);
          setModalOpen(true);
          dispatch(stageFetch(res));
          closeModal();
        });
      })
      .catch((err) => {
        console.log(err.response);
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
                ref={nameInputRef}
                placeholder="스테이지 제목을 입력해주세요."
                autoComplete="off"
                value={titleText}
                onChange={titleChangeHandler}
              />
              <span>{titleCnt}/20</span>
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
      <Modal open={modalOpen} close={closeAlertModal} header="안내">
        {alertText}
      </Modal>
    </div>
  );
};

export default StageUpdateForm;
