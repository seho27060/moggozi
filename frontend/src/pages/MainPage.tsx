import LogoutBtn from "../components/accounts/LogoutBtn";

import ChallengeList from "../components/challenge/ChallengeList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchChallengeRankList } from "../lib/withTokenApi";
import { ChallengeItemState } from "../store/challenge";

const MainPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedChallengeRankList, setLoadedChallengeRankList] = useState<
    ChallengeItemState[]
  >([]);
  useEffect(() => {
    console.log();
    setIsLoading(true);
    fetchChallengeRankList()
      .then((res) => {
        console.log(res);
        const challengeRankList: ChallengeItemState[] = [];

        for (const key in res) {
          const challenge: ChallengeItemState = {
            ...res[key],
          };
          challengeRankList.push(challenge);
        }
        setIsLoading(false);
        setLoadedChallengeRankList(challengeRankList);
      })
      // console.log(res)
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      MainPage
      <LogoutBtn />
      <Link to={`/challenge/new`}>
        <button>챌린지 생성</button>
      </Link>
      {isLoading === true && (
        <section>
          <p>Loading...</p>
        </section>
      )}
      {isLoading === false && (
        <ChallengeList challenges={loadedChallengeRankList} />
      )}
    </div>
  );
};

export default MainPage;
