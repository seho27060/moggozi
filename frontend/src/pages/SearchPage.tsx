import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
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

import SearchUserList from "../components/accounts/SearchUserList";
import ChallengeList from "../components/challenge/ChallengeList";
import Paging from "../layout/Paging";

import styles from "./SearchPage.module.scss"

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
  const [ totalElements, setTotalElement] = useState(0)

  const keyword = searchParams.get("keyword");
  const page = Number(searchParams.get("page"));
  const size = Number(searchParams.get("size"));
  const choice = Number(searchParams.get("choice"));

  useEffect(() => {
    document.body.style.overflow = "unset"
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
              setTotalElement(res.totalElements)

            }
          );
        } else {
          searchChallengeApi(keyword, Number(page), Number(size)).then(
            (res) => {
              setChallengeList(res.content);
              setTotalPages(res.totalPages);
              setTotalElement(res.totalElements)

            }
          );
        }
        break;
      case 1: // 유저 조회
        searchUserApi(keyword, page, size).then((res) => {
          // console.log(res)
          setUserList(res.content);
          setTotalPages(res.totalPages);
          setTotalElement(res.totalElements)

        });
        break;
      case 2: // 태그 조회
        if (isLoggedIn) {
          isLoginSearchChallengeHobbyApi(keyword, page, size).then((res) => {
            setChallengeHobbyList(res.content);
            setTotalPages(res.totalPages);
            setTotalElement(res.totalElements)

          });
        } else {
          searchChallengeHobbyApi(keyword, page, size).then((res) => {
            setChallengeHobbyList(res.content);
            setTotalPages(res.totalPages);
            setTotalElement(res.totalElements)
          });
        }
        break;
    }
  }, [searchParams, isLoggedIn]);

  const clickPageHandler = (event: React.MouseEvent, page: number) => {
    event.preventDefault();
    // console.log(totalPages);
    setSearchParams({
      keyword: keyword!,
      page: String(page - 1),
      size: String(size),
      choice: String(choice),
    });
  };

  const changePageHandler = (event: React.MouseEvent, choice: number) => {
    event.preventDefault();
    // console.log(totalPages);
    setSearchParams({
      keyword: keyword!,
      page: String(page),
      size: String(size),
      choice: String(choice),
    });
  };

  const onKeyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      const enteredSearch = searchInputRef.current!.value;
      if (!!enteredSearch) {
        setSearchParams({
          keyword: enteredSearch,
          page: "0",
          size: String(size),
          choice: String(choice),
        });
      }
    }
  }

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
    <div className={styles.layout}>
      <div>
        <div className={styles.title}>검색</div>
      <div className={styles.form}>
        <input type="text" placeholder="무엇이든 검색하세요." required id="search" ref={searchInputRef} onKeyPress={onKeyPressHandler} autoComplete="off"></input>
        <button onClick={submitHandler}>검색</button>
      </div>

      <div className={styles.tabs}>
        <button onClick={(e) => changePageHandler(e, 0)} disabled={choice === 0}>
          챌린지
        </button>
        <button onClick={(e) => changePageHandler(e, 1)} disabled={choice === 1}>
          유저
        </button>
        <button onClick={(e) => changePageHandler(e, 2)} disabled={choice === 2}>
          태그로 챌린지 검색
        </button>
      </div>

      <div className={styles.cnt}>
        검색결과 { totalElements }개
      </div>

      {choice === 0 && (
        <ChallengeList challenges={challengeList}></ChallengeList>
      )}
      {choice === 1 && <SearchUserList users={userList} />}
      {choice === 2 && (
        <ChallengeList challenges={challengeHobbyList}></ChallengeList>
      )}
      <Paging
        clickPageHandler={clickPageHandler}
        page={page + 1}
        totalPages={totalPages}
      />
      </div>
    </div>
  );
};

export default SearchPage;
