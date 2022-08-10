import ChallengeList from "../components/challenge/ChallengeList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoginFetchChallengeRankList } from "../lib/withTokenApi";
import { ChallengeItemState } from "../store/challenge";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchChallengeRankList } from "../lib/generalApi";

import styles from "./MainPage.module.scss"

const MainPage: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedChallengeRankList, setLoadedChallengeRankList] = useState<
    ChallengeItemState[]
  >([]);

  useEffect(() => {
    setIsLoading(true);

    if (isLoggedIn) {
      // 로그인 한 경우
      isLoginFetchChallengeRankList()
        .then((res) => {
          setLoadedChallengeRankList(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      // 로그인 안 한 경우
      fetchChallengeRankList()
        .then((res) => {
          setLoadedChallengeRankList(res);
          setIsLoading(false);
        })
        // console.log(res)
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.mainPage}>
      MainPage
      <Link to={`/challenge/new`}>
        <button>챌린지 생성</button>
      </Link>
      
      {isLoading === true && (
        <section>
          <p>Loading...</p>
        </section>
      )}
      {isLoading === false && (
        <div>
          <p>좋아요 순으로 정렬한 챌린지 리스트</p>
          <ChallengeList challenges={loadedChallengeRankList} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
