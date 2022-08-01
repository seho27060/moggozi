import LogoutBtn from "../components/accounts/LogoutBtn";

import ChallengeList from "../components/challenge/ChallengeList";
import { Link } from "react-router-dom";
import ChallengeNew from "./challenge/ChallengeNew";
import { useEffect, useState } from "react";
import { fetchChallengeRankList } from "../lib/withTokenApi";
import { ChallengeItemState } from "../store/challenge";

const MainPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedChallengeRankList, setLoadedChallengeRankList] = useState<
    ChallengeItemState[]
  >([]);
  useEffect(() => {
    console.log()
    setIsLoading(true);
    fetchChallengeRankList()
      .then((res) => {
        console.log(res)
        const challengeRankList: ChallengeItemState[] = [];

        for (const key in res) {
          const challenge: ChallengeItemState = {
            id: res[key].challenge_id,
            name: res[key].name,
            img: res[key].challenge_img,
            description: res[key].content,
            hobbies: res[key].tagList,
            writer: res[key].writer,
            level: res[key].level,
            userProgress: res[key].user_progress,
          };
          challengeRankList.push(challenge);
        };
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
        <ChallengeNew />
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
