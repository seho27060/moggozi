import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getTextLength from "../../lib/getTextLength";
import { hobbyExist, hobbySearch, setHobby } from "../../lib/withTokenApi";
import { addHobby, Hobby } from "../../store/challenge";
import { RootState } from "../../store/store";

import Modal from "../ui/Modal";

import styles from "./HobbyForm.module.scss";

const HobbyForm: React.FC = () => {
  const dispatch = useDispatch();
  const hobbyInputRef = useRef<HTMLInputElement>(null);
  const [dropDownList, setDropDownList] = useState<Hobby[]>([]); // 자동완성 기능을 위한 dropDownList
  const hobbyList = useSelector((state: RootState) => state.hobby.hobbyList);
  const [alertText, setAlertText] = useState(<div></div>);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inputCnt, setInputCnt] = useState(0);

  const closeModal = () => {
    document.body.style.overflow = "unset";
    setModalOpen(false);
  };

  function submitHandler() {
    const enteredHobby = hobbyInputRef.current!.value;
    if (!enteredHobby) {
      setAlertText(<div>태그를 입력해주세요!</div>);
      setModalOpen(true);
      return;
    }
    if (hobbyList.length >= 5) {
      setAlertText(<div>태그는 5개까지 등록 가능합니다.</div>);
      setModalOpen(true);
      return;
    }
    hobbyExist(enteredHobby)
      .then((res) => {
        if (!res) {
          // 취미 테이블에 없으면 새 취미 생성 alert 띄우기
          const isChk = window.confirm(
            "취미가 존재하지 않습니다. 새로운 취미를 등록하시겠습니까?"
          );
          if (isChk) {
            setHobby({ name: enteredHobby }) // 새로운 취미 DB에 등록 후 가져오기
              .then((res) => {
                dispatch(addHobby(res));
                setInputText("");
              });
          }
        } else {
          setHobby({ name: enteredHobby }).then((res) => {
            // Form에서 등록한 취미인지 확인
            if (hobbyList.some((hobby) => hobby.id === res.id)) {
              setAlertText(<div>이미 존재하는 취미입니다.</div>);
              setModalOpen(true);
            } else {
              dispatch(addHobby(res));
              setInputText("");
              setInputCnt(0);
              setDropDownList([]);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  const onClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    submitHandler();
  };

  const onKeyUpHandler = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (event.key === "Enter") {
      submitHandler();
    }
  };

  function changeInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const cnt = getTextLength(event.target.value);
    if (cnt > 10 && event.target.value.length > inputText.length) {
      return;
    }
    setInputCnt(cnt);
    setInputText(event.target.value);
    const enteredQuery = hobbyInputRef.current!.value;
    if (enteredQuery === "") {
      setDropDownList([]);
    } else {
      hobbySearch(enteredQuery)
        .then((res) => {
          setDropDownList(res);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }

  useEffect(() => {
    document.body.style.overflow = "unset";
  }, []);

  return (
    <div>
      <div className={styles.hobbyForm}>
        <label htmlFor="hobby">태그</label>
        <input
          type="text"
          required
          id="hobby"
          ref={hobbyInputRef}
          onChange={changeInputHandler}
          autoComplete="off"
          onKeyUp={onKeyUpHandler}
          value={inputText}
        />
        <button type="button" onClick={onClickHandler}>
          &#43;
        </button>
      </div>
      <div className={styles.tag}>
        {dropDownList.length === 0 && <div>해당하는 단어가 없습니다.</div>}
        {dropDownList.map((dropDownItem) => {
          return <div># {dropDownItem.name}</div>;
        })}
      </div>
      <Modal open={modalOpen} close={closeModal} header="안내">
        {alertText}
      </Modal>
    </div>
  );
};

export default HobbyForm;
