import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { searchChallengeApi, searchUserApi } from "../../lib/generalApi";
import { hobbySearch, isLoginSearchChallengeApi } from "../../lib/withTokenApi";
import { UserInfo } from "../../store/auth";
import { ChallengeItemState, Hobby } from "../../store/challenge";
import { RootState } from "../../store/store";
import UserList from "../accounts/UserList";
import ChallengeList from "../challenge/ChallengeList";

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
          search
        </button>
      </form>
      <p>챌린지</p>
      {dropDownChallengeList.length === 0 && <p>해당하는 단어가 없습니다.</p>}
      <ChallengeList challenges={dropDownChallengeList} />
      <p>유저</p>
      {dropDownUserList.length === 0 && <p>해당하는 단어가 없습니다.</p>}
      <UserList users={dropDownUserList} />
      <p>취미 태그</p>
      {dropDownHobbyList.length === 0 && <p>해당하는 단어가 없습니다.</p>}
      {dropDownHobbyList.map((dropDownItem) => {
        return (
          <Link
            to={`/search?keyword=${dropDownItem.name}&page=0&size=4&choice=2`}
            key={dropDownItem.id}
          >
            {dropDownItem.name}
          </Link>
        );
      })}
    </div>
  );
};
export default SearchForm;
