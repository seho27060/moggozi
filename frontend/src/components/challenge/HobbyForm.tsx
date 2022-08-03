import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hobbyExist, hobbySearch, setHobby } from "../../lib/withTokenApi";
import { addHobby, Hobby } from "../../store/challenge";
import { RootState } from "../../store/store";

const HobbyForm: React.FC = () => {
  const dispatch = useDispatch();
  const hobbyInputRef = useRef<HTMLInputElement>(null);
  const [dropDownList, setDropDownList] = useState<Hobby[]>([]); // 자동완성 기능을 위한 dropDownList
  const hobbyList = useSelector((state: RootState) => state.hobby.hobbyList);
  

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    const enteredHobby = hobbyInputRef.current!.value;
    hobbyExist(enteredHobby)
      .then((res) => {
        if (!res) {
          // 취미 테이블에 없으면 새 취미 생성 alert 띄우기
          const isChk = window.confirm(
            "취미가 존재하지 않습니다. 새로운 취미를 등록하시겠습니까?"
          );
          if (isChk) {
            setHobby({ name: enteredHobby })    // 새로운 취미 DB에 등록 후 가져오기
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
    if (enteredQuery === '') {
      setDropDownList([])
    }
    else {
      hobbySearch(enteredQuery)
        .then((res) => {
          setDropDownList(res)
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }

  return (
    <div>
      <h3>Hobby 생성</h3>
      <form>
        <label htmlFor="hobby">hobby : </label>
        <input
          type="text"
          required
          id="hobby"
          ref={hobbyInputRef}
          onChange={changeInputHandler}
        />
        <button type="button" onClick={submitHandler}>
          add
        </button>
      </form>
      {dropDownList.length === 0 && <p>해당하는 단어가 없습니다.</p>}
      {dropDownList.map((dropDownItem) => {
        return(<p>{dropDownItem.name}</p>)
      })}
    </div>
  );
};

export default HobbyForm;
