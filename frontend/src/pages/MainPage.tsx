import ChallengeList from "../components/challenge/ChallengeList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  isLoginFetchChallengeRankList,
  MyChallengeList,
} from "../lib/withTokenApi";
import { ChallengeItemState } from "../store/challenge";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchChallengeRankList } from "../lib/generalApi";

import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [rankIsLoading, setRankIsLoading] = useState(true);
  const [myIsLoading, setMyIsLoading] = useState(true);
  const [loadedChallengeRankList, setLoadedChallengeRankList] = useState<
    ChallengeItemState[]
  >([]);
  const [loadedMyChallengeList, setLoadedMyChallengeList] = useState<
    ChallengeItemState[]
  >([]);

  useEffect(() => {
    setRankIsLoading(true);
    setMyIsLoading(true);
    if (isLoggedIn) {
      // 로그인 한 경우
      isLoginFetchChallengeRankList()
        .then((res) => {
          setLoadedChallengeRankList(res);
          setRankIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRankIsLoading(false);
        });
      MyChallengeList()
        .then((res) => {
          setLoadedMyChallengeList(res);
          setMyIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setMyIsLoading(false);
        });
    } else {
      // 로그인 안 한 경우
      fetchChallengeRankList()
        .then((res) => {
          setLoadedChallengeRankList(res);
          setRankIsLoading(false);
        })
        // console.log(res)
        .catch((err) => {
          console.log(err);
          setRankIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.mainPage}>
      MainPage
      <Link to={`/challenge/new`}>
        <button>챌린지 생성</button>
      </Link>
      {isLoggedIn === true && myIsLoading === true && (
        <section>
          <p>MyList Loading...</p>
        </section>
      )}
      {isLoggedIn === true && myIsLoading === false && (
        <div>
          <p>내가 작성한 챌린지 리스트</p>
          <ChallengeList challenges={loadedMyChallengeList} />
        </div>
      )}
      {rankIsLoading === true && (
        <section>
          <p>RankList Loading...</p>
        </section>
      )}
      {rankIsLoading === false && (
        <div>
          <p>좋아요 순으로 정렬한 챌린지 리스트</p>
          <ChallengeList challenges={loadedChallengeRankList} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
