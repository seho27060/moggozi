import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { challengeAdd, challengeImgApi } from "../../lib/withTokenApi";
import { RootState } from "../../store/store";

import HobbyForm from "./HobbyForm";
import HobbySetList from "./HobbySetList";

import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";

import styles from "./ChallengeForm.module.scss";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageService } from "../../fbase/fbase";
import Modal from "../ui/Modal";
import getTextLength from "../../lib/getTextLength";

const ChallengeForm: React.FC<{ file: File | null }> = ({ file }) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const contentInputRef = useRef<ReactQuill>();
  const levelSelectRef = useRef<HTMLSelectElement>(null);
  const [alertText, setAlertText] = useState(<div></div>);
  const [modalOpen, setModalOpen] = useState(false);
  const [titleCnt, setTitleCnt] = useState(0);
  const [descriptionCnt, setDescriptionCnt] = useState(0);
  const [descriptionText, setDescriptionText] = useState("");
  const [titleText, setTitleText] = useState("");

  const hobbyList = useSelector((state: RootState) => state.hobby.hobbyList);
  const hobbyCnt = useSelector((state: RootState) => state.hobby.hobbyCnt);
  const navigate = useNavigate();

  document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함
  document.body.style.height = "auto";

  const closeModal = () => {
    document.body.style.overflow = "unset";
    setModalOpen(false);
  };

  const descriptionChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const cnt = getTextLength(event.target.value);
    if (cnt > 120 && event.target.value.length > descriptionText.length) {
      return;
    }
    setDescriptionCnt(cnt);
    setDescriptionText(event.target.value);
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

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (hobbyCnt === 0) {
      // 취미가 없을 땐 전송되지 않도록 한다.
      setAlertText(<div>취미를 입력해주세요!</div>);
      setModalOpen(true);
      return;
    }
    if (!file) {
      setAlertText(<div>사진은 필수입니다!</div>);
      setModalOpen(true);
      return;
    }
    const enteredName = nameInputRef.current!.value;
    const enteredDescription = descriptionInputRef.current!.value;
    const enteredContent = contentInputRef.current!.value;
    const enteredLevel = levelSelectRef.current!.value;
    if (!enteredName) {
      setAlertText(<div>제목을 입력해주세요!</div>);
      setModalOpen(true);
      return;
    }
    if (!enteredDescription) {
      setAlertText(<div>짧은 소개를 입력해주세요!</div>);
      setModalOpen(true);
      return;
    }
    if (!enteredContent) {
      console.log(enteredContent);
      setAlertText(<div>내용을 입력해주세요!</div>);
      setModalOpen(true);
      return;
    }

    const challengeData = {
      name: enteredName,
      img: "",
      content: enteredContent,
      level: Number(enteredLevel),
      description: enteredDescription,
      hobbyList: hobbyList,
    };

    challengeAdd(challengeData)
      .then((res) => {
        console.log(res);
        const challengeId = res.id;
        const imgRef = ref(storageService, `challenge/${challengeId}`);
        uploadBytes(imgRef, file!).then((res) => {
          getDownloadURL(res.ref).then((res) => {
            challengeImgApi(challengeId, res).then((res) => {
              setAlertText(<div>챌린지 생성이 완료되었습니다.</div>);
              setModalOpen(true);
              navigate(`/challenge/${challengeId}`, { replace: true }); // 뒤로가기 안 먹도록!
            });
          });
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return (
    <div>
      <div className={styles.shortIntroduce}>
        <label htmlFor="description">짧은 소개</label>
        <textarea
          ref={descriptionInputRef}
          name="description"
          id="description"
          placeholder="짧은 소개를 입력해주세요."
          value={descriptionText}
          required
          onChange={descriptionChangeHandler}
        ></textarea>
      </div>
        <div className={styles.descriptionCnt}>{descriptionCnt} / 120</div>

      <div className={styles.level}>
        <label htmlFor="level">난이도</label>
        <select name="level" id="level" ref={levelSelectRef} required>
          <option value="1">쉬움</option>
          <option value="2">보통</option>
          <option value="3">어려움</option>
        </select>
      </div>

      <HobbyForm />
      <HobbySetList hobbies={hobbyList} />

      <div className={styles.challengeTitle}>
        <input
          type="text"
          id="name"
          ref={nameInputRef}
          placeholder="챌린지 제목을 입력하세요."
          autoComplete="off"
          required
          value={titleText}
          onChange={titleChangeHandler}
        />
        <div className={styles.titleCnt}>{titleCnt}/20</div>
      </div>

      {/* <div className={styles.challengeContent}>
        <textarea rows={5} id="content" ref={contentInputRef} placeholder="내용을 입력해주세요." onChange={(event) => {
          setContentInput(event.target.value)
        }}/>
      </div> */}

      <div>
        <EditorComponent
          QuillRef={contentInputRef}
          value={""}
          maxlength={700}
        />
      </div>

      <div className={styles.done}>
        <button type="button" onClick={submitHandler}>
          등록하기
        </button>
      </div>
      <Modal open={modalOpen} close={closeModal} header="안내">
        {alertText}
      </Modal>
    </div>
  );
};

export default ChallengeForm;
