import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hobbySearch } from "../../lib/withTokenApi";

const SearchForm: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [dropDownList, setDropDownList] = useState<{
    challenge: string[];
    hobby: string[];
    user: string[];
  }>({ challenge: [], hobby: [], user: [] }); // 자동완성 기능을 위한 dropDownList
  const navigate = useNavigate();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredSearch = searchInputRef.current!.value;
    navigate(`/search/?q=${enteredSearch}`);
  };

  const changeInputHandler = (event: React.ChangeEvent) => {
    event.preventDefault();
    const enteredQuery = searchInputRef.current!.value;
    if (enteredQuery === "") {
      setDropDownList({ challenge: [], hobby: [], user: [] });
    } else {
      hobbySearch(enteredQuery)
        .then((res) => {
          setDropDownList({ ...dropDownList, hobby: res });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  return (
    <div>
      <h3>자동 완성 컴포넌트</h3>
      <form>
        <label htmlFor="search">search: </label>
        <input
          type="text"
          required
          id="search"
          ref={searchInputRef}
          onChange={changeInputHandler}
        ></input>
        <button type="button" onClick={submitHandler}>
          add
        </button>
      </form>
      <p>챌린지</p>
      {dropDownList.challenge.length === 0 && <p>해당하는 단어가 없습니다.</p>}
      {dropDownList.challenge.map((dropDownItem) => {
        return <p>{dropDownItem}</p>;
      })}
      <p>취미</p>
      {dropDownList.hobby.length === 0 && <p>해당하는 단어가 없습니다.</p>}
      {dropDownList.hobby.map((dropDownItem) => {
        return <p>{dropDownItem}</p>;
      })}
      <p>유저</p>
      {dropDownList.user.length === 0 && <p>해당하는 단어가 없습니다.</p>}
      {dropDownList.user.map((dropDownItem) => {
        return <p>{dropDownItem}</p>;
      })}
    </div>
  );
};
export default SearchForm;
