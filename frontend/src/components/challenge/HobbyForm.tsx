import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const [ content, setContent ] = useState(<div></div>)
  const [ modalOpen, setModalOpen ] = useState(false);

  const closeModal = () => {
    document.body.style.overflow = "unset";
    setModalOpen(false)
  }

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    const enteredHobby = hobbyInputRef.current!.value;
    console.log(hobbyList)
    if (hobbyList.length  >= 5) {
      setContent(<div>태그는 5개까지 등록 가능합니다.</div>)
      setModalOpen(true)
      return
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
              })
              .catch((err) => {
                console.log(err.response);
              });
          }
        } else {
          setHobby({ name: enteredHobby })
            .then((res) => {
              // Form에서 등록한 취미인지 확인
              if (hobbyList.some((hobby) => hobby.id === res.id)) {
                alert("이미 존재하는 취미입니다.");
              } else {
                dispatch(addHobby(res));
              }
            })
            .catch((err) => {
              console.log(err.response);
            });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function changeInputHandler(event: React.ChangeEvent) {
    event.preventDefault();
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
  }, [])


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
          />
          <button type="button" onClick={submitHandler}>
            &#43;
          </button>
      </div>
      <div className={styles.tag}>
      {dropDownList.length === 0 && <div >해당하는 단어가 없습니다.</div>}
      {dropDownList.map((dropDownItem) => {
        return <div># {dropDownItem.name}</ div>;
      })}
      </div>
      <Modal open={modalOpen} close={closeModal} header="안내">
        {content}
      </Modal>
    </div>
  );
};

export default HobbyForm;
