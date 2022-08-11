import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { challengeUpdate } from "../../lib/withTokenApi";
import { fetchHobby, ChallengeDetailState } from "../../store/challenge";
import { RootState } from "../../store/store";

import HobbyForm from "./HobbyForm";
import HobbySetList from "./HobbySetList";

import styles from "./ChallengeUpdateForm.module.scss";

const ChallengeUpdateForm: React.FC<{ challenge: ChallengeDetailState }> = (
  props
) => {
  const dispatch = useDispatch();

  // 처음 켤 때 취미를 저장소에 넣어준다.
  useEffect(() => {
    setContentInput(contentInputRef.current!.value)
    dispatch(fetchHobby(props.challenge.hobbyList));
  }, [dispatch, props]);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const [ contentInput, setContentInput ] = useState("");
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const levelSelectRef = useRef<HTMLSelectElement>(null);

  const hobbyList = useSelector((state: RootState) => state.hobby.hobbyList);
  const hobbyCnt = useSelector((state: RootState) => state.hobby.hobbyCnt);

  const navigate = useNavigate();

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (hobbyCnt === 0) {
      alert("취미를 입력해주세요!");
    } else {
      const enteredName = nameInputRef.current!.value;
      const enteredDescription = descriptionInputRef.current!.value;
      const enteredContent = contentInputRef.current!.value;
      const enteredLevel = levelSelectRef.current!.value;

      const challengeData = {
        name: enteredName,
        content: enteredContent,
        img: "",
        level: Number(enteredLevel),
        description: enteredDescription,
        hobbyList: hobbyList,
      };
      if (props.challenge.id) {
        // 챌린지 id가 존재하는 경우만
        challengeUpdate(challengeData, props.challenge.id)
          .then((res) => {
            console.log(res);
            alert("챌린지 수정이 완료되었습니다.");
            navigate(`/challenge/${res.id}`, { replace: true }); // 뒤로가기 안 먹도록!
          })
          .catch((err) => {
            alert(err.response);
          });
      }
    }
  }

  return (
    <div>
      <div className={styles.shortIntroduce}>
        <label htmlFor="description">짧은 소개 </label>
        <textarea name="description" id="description"             
        ref={descriptionInputRef}
        defaultValue={props.challenge.description || ""}
        placeholder="짧은 소개를 입력해주세요."
        ></textarea>
      </div>
      
      <div className={styles.level}>
        <label htmlFor="level">난이도</label>
        <select
          name="level"
          id="level"
          ref={levelSelectRef}
          defaultValue={props.challenge.level || ""}
        >
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
          required
          id="name"
          ref={nameInputRef}
          placeholder="챌린지 제목을 입력하세요."
          defaultValue={props.challenge.name || ""}
        />
      </div>
      <div className={styles.challengeContent}>
        <textarea
          rows={5}
          id="content"
          required
          ref={contentInputRef}
          defaultValue={props.challenge.content || ""}
          placeholder="내용을 입력해주세요."
          onChange={(e) => {
            setContentInput(e.target.value)
          }}
        />
      </div>
      <div className={styles.checker}>{contentInput.length} / 500</div>
      <div className={styles.done}>
        <button  type="button" onClick={submitHandler}>
          변경하기
        </button>
      </div>
    </div>
  );
};
export default ChallengeUpdateForm;
