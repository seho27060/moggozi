import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChallengeList from "../../components/challenge/ChallengeList";
import { fetchChallengeRankList } from "../../lib/generalApi";
import { isLoginFetchChallengeRankList } from "../../lib/withTokenApi";
import { ChallengeItemState } from "../../store/challenge";
import { RootState } from "../../store/store";

const Challenges: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [rankIsLoading, setRankIsLoading] = useState(true);
  const [loadedChallengeRankList, setLoadedChallengeRankList] = useState<
    ChallengeItemState[]
  >([]);
  const [recentIsLoading, setRecentIsLoading] = useState(true);
  const [loadedRecentChallengeList, setLoadedRecentChallengeRankList] =
    useState<ChallengeItemState[]>([]);
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
          <ChallengeList challenges={loadedChallengeRankList} />
        </div>
      )}
    </div>
  );
};

export default Challenges;
