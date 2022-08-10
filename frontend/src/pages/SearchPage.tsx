import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import UserList from "../components/accounts/UserList";
import ChallengeList from "../components/challenge/ChallengeList";
import Paging from "../layout/Paging";
import {
  searchChallengeApi,
  searchChallengeHobbyApi,
  searchUserApi,
} from "../lib/generalApi";
import {
  isLoginSearchChallengeApi,
  isLoginSearchChallengeHobbyApi,
} from "../lib/withTokenApi";
import { UserInfo } from "../store/auth";
import { ChallengeItemState } from "../store/challenge";
import { RootState } from "../store/store";

const SearchPage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [challengeList, setChallengeList] = useState<ChallengeItemState[]>([]);
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [challengeHobbyList, setChallengeHobbyList] = useState<
    ChallengeItemState[]
  >([]);
  const keyword = searchParams.get("keyword");
  const page = Number(searchParams.get("page"));
  const size = Number(searchParams.get("size"));
  const choice = Number(searchParams.get("choice"));

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    const page = Number(searchParams.get("page"));
    const size = Number(searchParams.get("size"));
    const choice = Number(searchParams.get("choice"));
    // 비어있으면 종료
    if (!keyword) {
      return;
    }
    switch (choice) {
      case 0: // 챌린지 조회
        if (isLoggedIn) {
          isLoginSearchChallengeApi(keyword, Number(page), Number(size)).then(
            (res) => {
              setChallengeList(res.content);
              setTotalPages(res.totalPages);
            }
          );
        } else {
          searchChallengeApi(keyword, Number(page), Number(size)).then(
            (res) => {
              setChallengeList(res.content);
              setTotalPages(res.totalPages);
            }
          );
        }
        break;
      case 1: // 유저 조회
        searchUserApi(keyword, page, size).then((res) => {
          setUserList(res.content);
          setTotalPages(res.totalPages);
        });
        break;
      case 2: // 태그 조회
        if (isLoggedIn) {
          isLoginSearchChallengeHobbyApi(keyword, page, size).then((res) => {
            setChallengeHobbyList(res.content);
            setTotalPages(res.totalPages);
          });
        } else {
          searchChallengeHobbyApi(keyword, page, size).then((res) => {
            setChallengeHobbyList(res.content);
            setTotalPages(res.totalPages);
          });
        }
        break;
    }
  }, [searchParams, isLoggedIn]);

  const clickPageHandler = (event: React.MouseEvent, page: number) => {
    event.preventDefault();
    console.log(totalPages);
    setSearchParams({
      keyword: keyword!,
      page: String(page - 1),
      size: String(size),
      choice: String(choice),
    });
  };

  const changePageHandler = (event: React.MouseEvent, choice: number) => {
    event.preventDefault();
    console.log(totalPages);
    setSearchParams({
      keyword: keyword!,
      page: String(page),
      size: String(size),
      choice: String(choice),
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredSearch = searchInputRef.current!.value;
    if (!!enteredSearch) {
      setSearchParams({
        keyword: enteredSearch,
        page: "0",
        size: String(size),
        choice: String(choice),
      });
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="search">search: </label>
        <input type="text" required id="search" ref={searchInputRef}></input>
        <button onClick={submitHandler}>검색</button>
      </form>
      <hr></hr>
      <button onClick={(e) => changePageHandler(e, 0)} disabled={choice === 0}>
        챌린지
      </button>
      <button onClick={(e) => changePageHandler(e, 1)} disabled={choice === 1}>
        유저
      </button>
      <button onClick={(e) => changePageHandler(e, 2)} disabled={choice === 2}>
        태그로 챌린지 검색
      </button>
      {choice === 0 && (
        <ChallengeList challenges={challengeList}></ChallengeList>
      )}
      {choice === 1 && <UserList users={userList} />}
      {choice === 2 && (
        <ChallengeList challenges={challengeHobbyList}></ChallengeList>
      )}
      <Paging
        clickPageHandler={clickPageHandler}
        page={page + 1}
        totalPages={totalPages}
      />
    </div>
  );
};

export default SearchPage;
