import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChallengeList from "../../components/challenge/ChallengeList";
import Loader from "../../components/ui/Loader";
import {
  fetchChallengeRankList,
  fetchRecentChallengeList,
} from "../../lib/generalApi";
import {
  isLoginFetchChallengeRankList,
  isLoginFetchRecentChallengeList,
} from "../../lib/withTokenApi";
import { ChallengeItemState } from "../../store/challenge";
import { RootState } from "../../store/store";

const Challenges: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [rankIsLoading, setRankIsLoading] = useState(true);
  const [loadedChallengeRankList, setLoadedChallengeRankList] = useState<
    ChallengeItemState[]
  >([]);
  const [recentIsLoading, setRecentIsLoading] = useState(true);
  const [loadedRecentChallengeList, setLoadedRecentChallengeList] = useState<
    ChallengeItemState[]
  >([]);
  const [isLogging, setIsLogging] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      console.log(currentPage);
      if (isLoggedIn) {
        isLoginFetchRecentChallengeList(currentPage, 9).then((res) => {
          setIsLogging(true);
          setLoadedRecentChallengeList(
            loadedRecentChallengeList.concat(res.content)
          );
          console.log(loadedRecentChallengeList);
          setTimeout(() => setIsLogging(false), 300);
        });
      } else {
        fetchRecentChallengeList(currentPage, 9).then((res) => {
          setIsLogging(true);
          setLoadedRecentChallengeList(
            loadedRecentChallengeList.concat(res.content)
          );
          setRecentIsLoading(false);
          setTimeout(() => setIsLogging(false), 300);
        });
      }
      setCurrentPage(currentPage + 1);
    }
  }, [isLoggedIn, loadedRecentChallengeList, currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

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

      isLoginFetchRecentChallengeList(0, 9)
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

      fetchRecentChallengeList(0, 9)
        .then((res) => {
          setLoadedRecentChallengeList(res.content);
          setRecentIsLoading(false);
        })
        // console.log(res)
        .catch((err) => {
          console.log(err);
          setRecentIsLoading(false);
        });
    }
  }, [isLoggedIn]);
  return (
    <div>
      <Link to={`/challenge/new`}>
        <button>챌린지 생성</button>
      </Link>

      {rankIsLoading === true && (
        <section>
          <p>RankList Loading...</p>
        </section>
      )}

      {rankIsLoading === false && (
        <div>
          <div>인기 챌린지</div>
          <div>
            <ChallengeList challenges={loadedChallengeRankList} />
          </div>
        </div>
      )}

      {recentIsLoading === true && (
        <section>
          <p>RecentList Loading...</p>
        </section>
      )}

      {recentIsLoading === false && (
        <div>
          <div>최신 챌린지</div>
          <div>
            <ChallengeList challenges={loadedRecentChallengeList} />
          </div>
        </div>
      )}
      {isLogging && <Loader />}
    </div>
  );
};

export default Challenges;
