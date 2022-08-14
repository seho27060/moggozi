import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchPostLikeList,
  fetchPostRecentList,
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
import AutoPlaySlider from "../components/ui/AutoPlaySlider";
import { PostData } from "../store/post";
import { Grid } from "@mui/material";
import MainPageItem from "../components/post/MainPageItem";

const MainPage: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [rankIsLoading, setRankIsLoading] = useState(true);
  const [recentTryIsLoading, setRecentTryIsLoading] = useState(true);
  const [recentIsLoading, setRecentIsLoading] = useState(true);
  const [recommendIsLoading, setRecommendIsLoading] = useState(true);
  const [recentPostList, setRecentPostList] = useState<PostData[]>([]);
  const [likePostList, setLikePostList] = useState<PostData[]>([]);
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
    fetchPostRecentList(0, 13)
      .then((res) => {
        console.log("recent post call", res);
        setRecentPostList(res.content);
      })
      .catch((err) => console.log("recent post err", err));
    fetchPostLikeList(0, 4)
      .then((res) => {
        console.log("like post call", res);
        setLikePostList(res.content);
      })
      .catch((err) => console.log("like post err", err));

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

        {/*자동 슬라이더  */}
        {[
          [0, 4],
          [4, 9],
          [9, 13],
        ].map((start) => (
          <div style={{ minHeight: "13rem" }}>
            <AutoPlaySlider>
              {recentPostList.slice(start[0], start[1]).map(
                (post) => (
                  console.log(post),
                  (
                    <div key={post.id}>
                      <img
                        src={
                          post.postImg!.length !== 0
                            ? post.postImg[0].path!
                            : "https://blog.kakaocdn.net/dn/vckff/btqCjeJmBHM/tMVpe4aUIMfH4nKS4aO3tK/img.jpg"
                        }
                        alt=""
                        style={{ minWidth: "300px" }}
                      ></img>
                    </div>
                  )
                )
              )}
            </AutoPlaySlider>
          </div>
        ))}
        <br />
        {/* 인기순 포스팅 */}
        <Grid container spacing={1}>
          {likePostList.map((post) => (
            <Grid key={post.id} item xs={3}>
              <MainPageItem post={post} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default MainPage;
