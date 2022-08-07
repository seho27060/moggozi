import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { challengeAdd } from "../../lib/withTokenApi";
import { RootState } from "../../store/store";
import HobbyForm from "./HobbyForm";
import HobbySetList from "./HobbySetList";

const ChallengeForm: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
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
      <h3>Challenge Form</h3>
      <HobbyForm />
      <HobbySetList hobbies={hobbyList} />
      <form>
        <label htmlFor="name">챌린지 이름: </label>
        <input type="text" id="name" ref={nameInputRef} />
        <br />
        <label htmlFor="description">챌린지 간단 설명: </label>
        <input type="text" id="description" ref={descriptionInputRef} />
        <br />
        <label htmlFor="content">챌린지 상세 내용: </label>
        <textarea rows={5} id="content" ref={contentInputRef} />
        <br />
        <label htmlFor="level">챌린지 level</label>
        <select name="level" id="level" ref={levelSelectRef}>
          <option value="1">매우 쉬움</option>
          <option value="2">쉬움</option>
          <option value="3">보통</option>
          <option value="4">어려움</option>
          <option value="5">매우 어려움</option>
        </select>
        <br />
        <button type="button" onClick={submitHandler}>
          생성
        </button>
      </form>
    </div>
  );
};

export default ChallengeForm;
