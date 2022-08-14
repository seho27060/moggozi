import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  isLoginFetchChallengeRankList,
  recentTryChallengeList,
} from "../lib/withTokenApi";
import { fetchChallengeRankList } from "../lib/generalApi";
import { ChallengeItemState } from "../store/challenge";
import { RootState } from "../store/store";

import MainChallengeList from "../components/challenge/MainChallengeList";
import MainSlider from "../components/ui/MainSlider";

import styles from "./MainPage.module.scss";
import MainPopChallengeList from "../components/challenge/MainPopChallengeList";

const MainPage: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [rankIsLoading, setRankIsLoading] = useState(true);
  const [recentIsLoading, setRecentIsLoading] = useState(true);
  const [loadedChallengeRankList, setLoadedChallengeRankList] = useState<
    ChallengeItemState[]
  >([]);
  const [loadedRecentChallengeList, setLoadedRecentChallengeList] = useState<
    ChallengeItemState[]
  >([]);

  useEffect(() => {
    setRankIsLoading(true);
    setRecentIsLoading(true);
    if (isLoggedIn) {
      // 로그인 한 경우
      isLoginFetchChallengeRankList(0, 3)
        .then((res) => {
          setLoadedChallengeRankList(res.content);
          setRankIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRankIsLoading(false);
        });
      recentTryChallengeList(0, 2)
        .then((res) => {
          setLoadedRecentChallengeList(res.content);
          setRecentIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRecentIsLoading(false);
        });
    } else {
      // 로그인 안 한 경우
      fetchChallengeRankList(0, 3)
        .then((res) => {
          setLoadedChallengeRankList(res.content);
          setRankIsLoading(false);
        })
        // console.log(res)
        .catch((err) => {
          console.log(err);
          setRankIsLoading(false);
        });
    }
  }, [isLoggedIn]);
  console.log(loadedChallengeRankList);
  return (
    <div className={styles.container}>
      <Link to={`/challenge/new`}>
        <button>챌린지 생성</button>
      </Link>
      {isLoggedIn === true && recentIsLoading === true && (
        <section>
          <p>MyList Loading...</p>
        </section>
      )}
      <div className={styles.mainPage}>
        <MainSlider />

        {isLoggedIn === true && recentIsLoading === false && (
          <div className={styles.myChallenge}>
            <div className={styles.myTitle}>
              <div>내가 참여한</div>
              <div>챌린지</div>
            </div>
            <MainChallengeList challenges={loadedRecentChallengeList} />
          </div>
        )}

        {rankIsLoading === true && (
          <section>
            <p>RankList Loading...</p>
          </section>
        )}

        {rankIsLoading === false && (
          <div className={styles.popChallenge}>
            <div className={styles.title}>인기 챌린지</div>
            <MainPopChallengeList challenges={loadedChallengeRankList} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
