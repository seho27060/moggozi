import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { challengeUpdate } from "../../lib/withTokenApi";
import { fetchHobby, ChallengeDetailState } from "../../store/challenge";
import { RootState } from "../../store/store";

import HobbyForm from "./HobbyForm";
import HobbySetList from "./HobbySetList";

import styles from "./ChallengeUpdateForm.module.scss";

import EditorComponent from "../ui/Editor";
import ReactQuill from "react-quill";
import getTextLength from "../../lib/getTextLength";
import Modal from "../ui/Modal";

const ChallengeUpdateForm: React.FC<{ challenge: ChallengeDetailState }> = (
  props
) => {
  const dispatch = useDispatch();

  const [alertText, setAlertText] = useState(<div></div>);
  const [modalOpen, setModalOpen] = useState(false);

  const [titleCnt, setTitleCnt] = useState(0);
  const [descriptionCnt, setDescriptionCnt] = useState(0);
  const [descriptionText, setDescriptionText] = useState(
    props.challenge.description || ""
  );
  const [titleText, setTitleText] = useState(props.challenge.name || "");

  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  // const [ contentInput, setContentInput ] = useState();
  const contentInputRef = useRef<ReactQuill>();
  const levelSelectRef = useRef<HTMLSelectElement>(null);

  const hobbyList = useSelector((state: RootState) => state.hobby.hobbyList);
  const hobbyCnt = useSelector((state: RootState) => state.hobby.hobbyCnt);
  const navigate = useNavigate();

  document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함
  document.body.style.height = "auto";

  const closeModal = () => {
    document.body.style.overflow = "unset";
    setModalOpen(false);
  };

  // 처음 켤 때 취미를 저장소에 넣어준다.
  useEffect(() => {
    // setContentInput(contentInputRef.current!.value)
    dispatch(fetchHobby(props.challenge.hobbyList));

    setDescriptionCnt(descriptionInputRef.current!.value.length);
    setTitleCnt(nameInputRef.current!.value.length);
  }, [dispatch, props]);

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
      setAlertText(<div>취미를 입력해주세요!</div>);
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
          setAlertText(<div>챌린지 수정이 완료되었습니다.</div>);
          setModalOpen(true);
          navigate(`/challenge/${res.id}`, { replace: true }); // 뒤로가기 안 먹도록!
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }

  return (
    <div>
      <div className={styles.shortIntroduce}>
        <label htmlFor="description">짧은 소개 </label>
        <textarea
          style={{ height: 60 }}
          name="description"
          id="description"
          ref={descriptionInputRef}
          value={descriptionText}
          placeholder="짧은 소개를 입력해주세요."
          onChange={descriptionChangeHandler}
        ></textarea>
        <span>{descriptionCnt}/120</span>
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
          value={titleText}
          onChange={titleChangeHandler}
        />
        <span>{titleCnt}/20</span>
      </div>
      {/* <div className={styles.challengeContent}>
        <textarea
          rows={5}
          id="content"
          required
          // ref={contentInputRef}
          defaultValue={props.challenge.content || ""}
          placeholder="내용을 입력해주세요."
          onChange={(e) => {
            // setContentInput(e.target.value)
          }}
        />
      </div> */}
      <div>
        <EditorComponent
          QuillRef={contentInputRef}
          value={props.challenge.content!}
        />
      </div>
      {/* <div className={styles.checker}>{contentInput.length} / 500</div> */}
      <div className={styles.done}>
        <button type="button" onClick={submitHandler}>
          변경하기
        </button>
      </div>
      <Modal open={modalOpen} close={closeModal} header="안내">
        {alertText}
      </Modal>
    </div>
  );
};
export default ChallengeUpdateForm;
