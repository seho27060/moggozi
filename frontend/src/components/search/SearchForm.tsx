import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchChallengeApi, searchUserApi } from "../../lib/generalApi";
import { hobbySearch, isLoginSearchChallengeApi } from "../../lib/withTokenApi";
import { UserInfo } from "../../store/auth";
import { ChallengeItemState, Hobby } from "../../store/challenge";
import { RootState } from "../../store/store";

import UserList from "../accounts/UserList";
import SearchChallengeList from "../challenge/SearchChallengeList";

import styles from "./SearchForm.module.scss";

const SearchForm: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  // 자동완성 기능을 위한 dropDownList
  const [dropDownChallengeList, setDropDownChallengeList] = useState<
    ChallengeItemState[]
  >([]);
  const [dropDownHobbyList, setDropDownHobbyList] = useState<Hobby[]>([]);
  const [dropDownUserList, setDropDownUserList] = useState<UserInfo[]>([]);

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredSearch = searchInputRef.current!.value;
    navigate(`/search/?keyword=${enteredSearch}&page=0&size=4&choice=0`);
  };

  const changeInputHandler = (event: React.ChangeEvent) => {
    event.preventDefault();
    const enteredQuery = searchInputRef.current!.value;
    console.log(enteredQuery);
    if (enteredQuery === "") {
      setDropDownChallengeList([]);
      setDropDownHobbyList([]);
      setDropDownUserList([]);
    } else {
      hobbySearch(enteredQuery)
        .then((res) => {
          setDropDownHobbyList(res);
        })
        .catch((err) => {
          console.log(err.response);
        });
      searchUserApi(enteredQuery, 0, 5)
        .then((res) => {
          setDropDownUserList(res.content);
        })
        .catch((err) => {
          console.log(err.response);
        });
      if (isLoggedIn) {
        isLoginSearchChallengeApi(enteredQuery, 0, 5)
          .then((res) => {
            setDropDownChallengeList(res.content);
          })
          .catch((err) => {
            console.log(err.response);
          });
      } else {
        searchChallengeApi(enteredQuery, 0, 5)
          .then((res) => {
            setDropDownChallengeList(res.content);
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    }
  };

  return (
    <div>
      <header>
        <input
          type="text"
          required
          id="search"
          ref={searchInputRef}
          placeholder="무엇이든 검색하세요."
          onChange={changeInputHandler}
        ></input>
        <button type="button" onClick={submitHandler}>
          돋보기
        </button>
      </header>

      {/* <main> */}
      <main className={styles.tag}>
        <h1>유저</h1>
        {dropDownUserList.length === 0 && <h2>해당하는 유저가 없습니다.</h2>}
        <UserList users={dropDownUserList} />
      </main>
      <main>
        <h1>챌린지</h1>
        {dropDownChallengeList.length === 0 && (
          <h2>해당하는 챌린지가 없습니다.</h2>
        )}
        <SearchChallengeList challenges={dropDownChallengeList} />
      </main>
      <main>
        <h1>태그</h1>
        {dropDownHobbyList.length === 0 && <h2>해당하는 태그가 없습니다.</h2>}
        {dropDownHobbyList.map((dropDownItem) => {
          return (
            <div className={styles.tag}>
            <Link 
              to={`/search?keyword=${dropDownItem.name}&page=0&size=4&choice=2`}
              key={dropDownItem.id}
            >
              # {dropDownItem.name}
            </Link>
            </div>
          );
        })}
      </main>
      {/* </main> */}
    </div>
  );
};
export default SearchForm;
