import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewChallengeList from "../../components/challenge/NewChallengeList";
import PopChallengeList from "../../components/challenge/PopChallengeList";
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

import styles from "./Challenges.module.scss";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const Challenges: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [rankIsLoading, setRankIsLoading] = useState(true);
  const [loadedChallengeRankList, setLoadedChallengeRankList] = useState<
    ChallengeItemState[]
  >([]);
  const [maxPage, setMaxPage] = useState(0);
  const [recentIsLoading, setRecentIsLoading] = useState(true);
  const [loadedRecentChallengeList, setLoadedRecentChallengeList] = useState<
    ChallengeItemState[]
  >([]);
  const [pageIsLoading, setPageIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (
      maxPage > currentPage + 1 &&
      Math.round(scrollTop + innerHeight) >= scrollHeight
    ) {
      console.log(currentPage);
      setPageIsLoading(true);
      if (isLoggedIn) {
        isLoginFetchRecentChallengeList(currentPage + 1, 5)
          .then((res) => {
            setLoadedRecentChallengeList(
              loadedRecentChallengeList.concat(res.content)
            );
            setTimeout(() => setPageIsLoading(false), 300);
            setCurrentPage(res.pageNum);
          })
          .catch((err) => {
            console.log(err);
            setPageIsLoading(false);
          });
      } else {
        fetchRecentChallengeList(currentPage + 1, 5)
          .then((res) => {
            setLoadedRecentChallengeList(
              loadedRecentChallengeList.concat(res.content)
            );
            setRecentIsLoading(false);
            setTimeout(() => setPageIsLoading(false), 300);
            setCurrentPage(res.pageNum);
          })
          .catch((err) => {
            console.log(err);
            setPageIsLoading(false);
          });
      }
    }
  }, [isLoggedIn, loadedRecentChallengeList, currentPage, maxPage]);

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
      isLoginFetchChallengeRankList(0, 5)
        .then((res) => {
          setLoadedChallengeRankList(res.content);
          setRankIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRankIsLoading(false);
        });

      isLoginFetchRecentChallengeList(0, 5)
        .then((res) => {
          setLoadedRecentChallengeList(res.content);
          setMaxPage(res.totalPages);
          setRecentIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRecentIsLoading(false);
        });
    } else {
      // 로그인 안 한 경우
      fetchChallengeRankList(0, 5)
        .then((res) => {
          setLoadedChallengeRankList(res.content);
          setRankIsLoading(false);
        })
        // console.log(res)
        .catch((err) => {
          console.log(err);
          setRankIsLoading(false);
        });

      fetchRecentChallengeList(0, 5)
        .then((res) => {
          setLoadedRecentChallengeList(res.content);
          setRecentIsLoading(false);
          setMaxPage(res.totalPages);
        })
        // console.log(res)
        .catch((err) => {
          console.log(err);
          setRecentIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.container}>
      <div>
        {rankIsLoading === true && <Loader />}
        {rankIsLoading === false && (
          <div>
            <div className={styles.popularChallengeTitle}>
              <div>인기 챌린지</div>
              <button
                onClick={() => {
                  navigate(`/challenge/new`);
                }}
              >
                챌린지 만들기
              </button>
            </div>
            <div>
              <PopChallengeList challenges={loadedChallengeRankList} />
            </div>
          </div>
        )}

        {recentIsLoading === true && <Loader />}

        {recentIsLoading === false && (
          <div className={styles.newChallenge}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={styles.new}>
                <div className={styles.sentence}>
                  <div>방금 만들어진</div>
                  <div>따끈따끈한 챌린지를 만나보세요!</div>
                </div>
                <div className={styles.icon}>
                  <LocalFireDepartmentIcon />
                </div>
              </div>
            </div>

            <div>
              <NewChallengeList challenges={loadedRecentChallengeList} />
            </div>
          </div>
        )}
        {pageIsLoading && <Loader />}
      </div>
    </div>
  );
};

export default Challenges;
