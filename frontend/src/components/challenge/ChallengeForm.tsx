import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { challengeAdd } from "../../lib/withTokenApi";
import { RootState } from "../../store/store";

import HobbyForm from "./HobbyForm";
import HobbySetList from "./HobbySetList";


import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";

import styles from "./ChallengeForm.module.scss"

const ChallengeForm: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const [ contentInput, setContentInput ] = useState("");
  const contentInputRef = useRef<ReactQuill>();
  const levelSelectRef = useRef<HTMLSelectElement>(null);

  const hobbyList = useSelector((state: RootState) => state.hobby.hobbyList);
  const hobbyCnt = useSelector((state: RootState) => state.hobby.hobbyCnt);

  const navigate = useNavigate();

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (hobbyCnt === 0) {
      // 취미가 없을 땐 전송되지 않도록 한다.
    } else {
      const enteredName = nameInputRef.current!.value;
      const enteredDescription = descriptionInputRef.current!.value;
      const enteredContent = contentInputRef.current!.value;
      const enteredLevel = levelSelectRef.current!.value;

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
          alert("챌린지 생성이 완료되었습니다.");
          navigate(`/challenge/${res.id}`, { replace: true }); // 뒤로가기 안 먹도록!
        })
        .catch((err) => {
          alert(err.response);
        });
    }
  }
  return (
    <div>
      <div className={styles.shortIntroduce}>
        <label htmlFor="description">짧은 소개</label>
        <textarea name="description" id="description" placeholder="짧은 소개를 입력해주세요." ref={descriptionInputRef} ></textarea>
      </div>

      <div className={styles.level}>
        <label htmlFor="level">난이도</label>
        <select name="level" id="level" ref={levelSelectRef}>
          <option value="1">쉬움</option>
          <option value="2">보통</option>
          <option value="3">어려움</option>
        </select>
      </div>
      
      <HobbyForm />
      <HobbySetList hobbies={hobbyList} />

      <div className={styles.challengeTitle}>
        <input type="text" id="name" ref={nameInputRef} placeholder="챌린지 제목을 입력하세요." autoComplete="off" />
      </div>

      {/* <div className={styles.challengeContent}>
        <textarea rows={5} id="content" ref={contentInputRef} placeholder="내용을 입력해주세요." onChange={(event) => {
          setContentInput(event.target.value)
        }}/>
      </div> */}

      <div>
          <EditorComponent QuillRef={contentInputRef} value={""} />
        </div>
      
      <div className={styles.done}>
        <button type="button" onClick={submitHandler}>
          등록하기
        </button>
      </div>
    </div>
  );
};

export default ChallengeForm;
