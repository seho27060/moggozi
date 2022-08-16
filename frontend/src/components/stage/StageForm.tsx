import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStages, stageAdd } from "../../lib/withTokenApi";
import { stageFetch } from "../../store/stage";

import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";

import styles from "./StageForm.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Modal from "../ui/Modal";
import getTextLength from "../../lib/getTextLength";

const StageForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<ReactQuill>();
  const { challengeId } = useParams();
  const [alertText, setAlertText] = useState(<div></div>);
  const [modalOpen, setModalOpen] = useState(false);
  const [titleCnt, setTitleCnt] = useState(0);
  const [titleText, setTitleText] = useState("");
  const stages = useSelector((state: RootState) => state.stages);

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

  function stageSubmitHandler(event: React.FormEvent) {
    event.preventDefault();

    if (stages.length > 10) {
      setAlertText(<div>스테이지의 개수는 10개까지 입니다.</div>);
      setModalOpen(true);
      return;
    }

    const stageData = {
      name: nameInputRef.current!.value,
      content: contentInputRef.current!.value,
      img: "",
    };
    if (!stageData.name) {
      setAlertText(<div>스테이지 제목이 필요합니다.</div>);
      setModalOpen(true);
      return;
    }
    if (!stageData.content) {
      setAlertText(<div>스테이지 본문이 필요합니다.</div>);
      setModalOpen(true);
      return;
    }

    stageAdd(stageData, Number(challengeId!))
      .then((res) => {
        fetchStages(Number(challengeId!))
          .then((res) => {
            setAlertText(<div>스테이지 생성이 완료되었습니다.</div>);
            setModalOpen(true);
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
      <div>
        <form className={styles.stageForm}>
          <div>
            <input
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
            <EditorComponent QuillRef={contentInputRef} value={""} maxlength={500}/>
          </div>
        </form>
        <div className={styles.buttons}>
          <button type="button" onClick={stageSubmitHandler}>
            등록하기
          </button>
        </div>
      </div>
      <Modal open={modalOpen} close={closeAlertModal} header="안내">
        {alertText}
      </Modal>
    </div>
  );
};
export default StageForm;
