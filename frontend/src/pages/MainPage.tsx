import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  isLoginFetchChallengeRankList,
  isLoginFetchRecentChallengeList,
  isLoginFetchRecommendChallengeList,
  recentTryChallengeList,
} from "../lib/withTokenApi";
import {
  fetchChallengeRankList,
  fetchRecentChallengeList,
  fetchRecommendChallengeList,
} from "../lib/generalApi";
import { ChallengeItemState } from "../store/challenge";
import { RootState } from "../store/store";

import MainChallengeList from "../components/challenge/MainChallengeList";
import MainSlider from "../components/ui/MainSlider";

import styles from "./MainPage.module.scss";
import MainPopChallengeList from "../components/challenge/MainPopChallengeList";

const MainPage: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [rankIsLoading, setRankIsLoading] = useState(true);
  const [recentTryIsLoading, setRecentTryIsLoading] = useState(true);
  const [recentIsLoading, setRecentIsLoading] = useState(true);
  const [recommendIsLoading, setRecommendIsLoading] = useState(true);

  const [loadedChallengeRankList, setLoadedChallengeRankList] = useState<
    ChallengeItemState[]
  >([]);
  const [loadedRecentTryChallengeList, setLoadedRecentTryChallengeList] =
    useState<ChallengeItemState[]>([]);
  const [loadedRecentChallengeList, setLoadedRecentChallengeList] = useState<
    ChallengeItemState[]
  >([]);
  const [recommendChallengeList, setRecommendChallengeList] = useState<
    ChallengeItemState[]
  >([]);

  useEffect(() => {
    setRankIsLoading(true);
    setRecentTryIsLoading(true);
    setRecentIsLoading(true);
    setRecommendIsLoading(true);

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

      isLoginFetchRecentChallengeList(0, 2)
        .then((res) => {
          setLoadedRecentChallengeList(res.content);
          setRecentIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRecentIsLoading(false);
        });

      isLoginFetchRecommendChallengeList()
        .then((res) => {
          const twoPickRecommend = res.slice(0, 2);
          setRecommendChallengeList(twoPickRecommend);
          setRecommendIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRecommendIsLoading(false);
        });

      // 유저가 도전한 챌린지 리스트
      recentTryChallengeList(0, 2)
        .then((res) => {
          setLoadedRecentTryChallengeList(res.content);
          setRecentTryIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRecentTryIsLoading(false);
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

      fetchRecentChallengeList(0, 2)
        .then((res) => {
          setLoadedRecentChallengeList(res.content);
          setRecentIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRecentIsLoading(false);
        });

      fetchRecommendChallengeList()
        .then((res) => {
          const twoPickRecommend = res.slice(0, 2);
          setRecommendChallengeList(twoPickRecommend);
          setRecommendIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRecommendIsLoading(false);
        });
    }
  }, [isLoggedIn]);
  console.log(loadedChallengeRankList);
  return (
    <div className={styles.container}>
      <Link to={`/challenge/new`}>
        <button>챌린지 생성</button>
      </Link>
      <div className={styles.mainPage}>
        <MainSlider />
        {/* 최신 챌린지*/}
        {recentIsLoading === true && (
          <section>
            <p>recentList Loading...</p>
          </section>
        )}
        {recentIsLoading === false && (
          <div className={styles.myChallenge}>
            <div className={styles.myTitle}>
              <div>최신</div>
              <div>챌린지</div>
            </div>
            <MainChallengeList challenges={loadedRecentChallengeList} />
          </div>
        )}

        {/* 추천 챌린지*/}
        {recommendIsLoading === true && (
          <section>
            <p>recommendList Loading...</p>
          </section>
        )}
        {recommendIsLoading === false && (
          <div className={styles.myChallenge}>
            <div className={styles.myTitle}>
              <div>추천</div>
              <div>챌린지</div>
            </div>
            <MainChallengeList challenges={recommendChallengeList} />
          </div>
        )}

        {/* 참여한 챌린지 */}
        {isLoggedIn === true && recentTryIsLoading === true && (
          <section>
            <p>MyTryList Loading...</p>
          </section>
        )}
        {isLoggedIn === true && recentTryIsLoading === false && (
          <div className={styles.myChallenge}>
            <div className={styles.myTitle}>
              <div>내가 참여한</div>
              <div>챌린지</div>
            </div>
            <MainChallengeList challenges={loadedRecentTryChallengeList} />
          </div>
        )}

        {/* 인기 챌린지 */}
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
