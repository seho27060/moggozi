import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
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
import MainRecomChallengeList from "../components/challenge/MainRecomChallengeList";
import MainSlider from "../components/ui/MainSlider";

import MainPopChallengeList from "../components/challenge/MainPopChallengeList";
import AutoPlaySlider from "../components/ui/AutoPlaySlider";
import { PostData } from "../store/post";
import { Grid, Skeleton } from "@mui/material";
import MainPageItem from "../components/post/MainPageItem";
import PostModal from "../components/ui/PostModal";
import { setPostModalOpen, setPostUpdateFormState } from "../store/postModal";
import { useDispatch } from "react-redux";
import PostDetailItem from "../components/post/PostDetailItem";
import PostUpdateForm from "../components/post/PostUpdateForm";

import styles from "./MainPage.module.scss";
import no_image from "../asset/no_image.png";

import PostFormModal from "../components/ui/PostFormModal";

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  // 로딩
  const [rankIsLoading, setRankIsLoading] = useState(false);
  const [recentTryIsLoading, setRecentTryIsLoading] = useState(false);
  const [recentIsLoading, setRecentIsLoading] = useState(false);
  const [recommendIsLoading, setRecommendIsLoading] = useState(false);
  const [rankPostIsLoading, setRankPostIsLoading] = useState(false);
  const [recentPostIsLoading, setRecentPostIsLoading] = useState(false);

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

  const { postModalOpen, postUpdateFormOpen } = useSelector(
    (state: RootState) => state.postModal
  );

  const closePostModal = () => {
    dispatch(setPostModalOpen(false));
    dispatch(setPostUpdateFormState(false));
  };
  useEffect(() => {
    setRankIsLoading(true);
    setRecentIsLoading(true);
    setRecommendIsLoading(true);
    setRankPostIsLoading(true);
    setRecentPostIsLoading(true);
    // 최신 포스트
    fetchPostRecentList(0, 25)
      .then((res) => {
        setRecentPostList(res.content);
        setRecentPostIsLoading(false);
      })
      .catch((err) => {
        console.log("recent post err", err);
        setRecentPostIsLoading(false);
      });
    // 인기 포스트
    fetchPostLikeList(0, 4)
      .then((res) => {
        setLikePostList(res.content);
        // setRankPostIsLoading(false);
        setTimeout(() => setRankPostIsLoading(false), 2000);
      })
      .catch((err) => {
        console.log("like post err", err);
        setRankPostIsLoading(false);
      });

    if (isLoggedIn) {
      setRecentTryIsLoading(true);
      // 로그인 한 경우
      // 인기 순
      isLoginFetchChallengeRankList(0, 3)
        .then((res) => {
          setLoadedChallengeRankList(res.content);
          setRankIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRankIsLoading(false);
        });
      // 최신 순
      isLoginFetchRecentChallengeList(0, 2)
        .then((res) => {
          setLoadedRecentChallengeList(res.content);
          setRecentIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRecentIsLoading(false);
        });
      // 추천 순
      isLoginFetchRecommendChallengeList()
        .then((res) => {
          const twoPickRecommend = res.slice(0, 5);
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
      // 인기 순
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
      // 최신 순
      fetchRecentChallengeList(0, 2)
        .then((res) => {
          setLoadedRecentChallengeList(res.content);
          setRecentIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRecentIsLoading(false);
        });
      // 추천 순
      fetchRecommendChallengeList()
        .then((res) => {
          const twoPickRecommend = res.slice(0, 6);
          setRecommendChallengeList(twoPickRecommend);
          setRecommendIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setRecommendIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  return (
    <div>
      {!rankIsLoading &&
      !recentTryIsLoading &&
      !recentIsLoading &&
      !recommendIsLoading &&
      !rankPostIsLoading &&
      !recentPostIsLoading ? (
        <div>
          <div className={styles.container}>
            <div>
              <div className={styles.mainPage}>
                <div className={styles.mainSlider}>
                  <MainSlider />
                </div>

                {/* 참여한 챌린지 */}
                {isLoggedIn === true && (
                  <div className={styles.myChallenge}>
                    <div className={styles.myTitle}>
                      <div>내가 참여한</div>
                      <div>챌린지</div>
                    </div>
                    <MainChallengeList
                      challenges={loadedRecentTryChallengeList}
                    />
                  </div>
                )}

                {/* 최신 챌린지*/}
                <div className={styles.myChallenge}>
                  <div className={styles.myTitle}>
                    <div>최신</div>
                    <div>챌린지</div>
                  </div>
                  <MainChallengeList challenges={loadedRecentChallengeList} />
                </div>

                {/* 추천 챌린지*/}
                <div className={styles.recommendChallenge}>
                  <div className={styles.myTitle}>
                    <div>모꼬지가 추천하는 챌린지</div>
                  </div>
                  <MainRecomChallengeList challenges={recommendChallengeList} />
                </div>

                {/* 인기 챌린지 */}
                <div className={styles.popChallenge}>
                  <div className={styles.title}>인기 챌린지</div>
                  <MainPopChallengeList challenges={loadedChallengeRankList} />
                </div>
              </div>

              {/* 인기순 포스팅 */}
              <div className={styles.popPosting}>
                <div>인기 포스팅</div>
                <Grid container spacing={1}>
                  {likePostList.map((post) => (
                    <Grid key={post.id} item xs={3}>
                      <MainPageItem post={post} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
            <div>
              {postModalOpen && !postUpdateFormOpen && (
                <PostModal open={postModalOpen} close={closePostModal}>
                  <PostDetailItem />
                </PostModal>
              )}
              {postModalOpen && postUpdateFormOpen && (
                <PostFormModal open={postModalOpen} close={closePostModal}>
                  <PostUpdateForm />
                </PostFormModal>
              )}
            </div>
          </div>

          <div className={styles.sliderTitle}>
            <div>방금 등록된</div>
            <div>모꼬지 회원들의 포스팅을 구경하세요!</div>
          </div>
          <div className={styles.postingSlider}>
            {/*최신 포스팅 자동 슬라이더  */}
            {[
              [0, 9],
              [8, 17],
              [16, 25],
            ].map((start, index) => (
              <div
                key={start[0]}
                style={{ minHeight: "13rem", padding: "15px 0 0 0" }}
              >
                <AutoPlaySlider rtl={index + 1}>
                  {recentPostList.slice(start[0], start[1]).map((post) => {
                    return (
                      <div key={post.id}>
                        <img
                          src={
                            post.postImg!.length !== 0
                              ? post.postImg[0].path!
                              : no_image
                          }
                          alt=""
                          style={{ minWidth: "300px" }}
                        ></img>
                      </div>
                    );
                  })}
                </AutoPlaySlider>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div>
            <div className={styles.mainPage}>
              <Skeleton
                className={styles.mainSlider}
                variant="rectangular"
                height={450}
                width={989}
              />
              {isLoggedIn === true && (
                <div className={styles.myChallenge}>
                  <Skeleton className={styles.myTitle}>
                    <div>내가 참여한</div>
                    <div>챌린지</div>
                  </Skeleton>

                  <Skeleton>
                    <MainChallengeList
                      challenges={loadedRecentTryChallengeList}
                    />
                  </Skeleton>
                </div>
              )}
              <div style={{ height: 30 }} />
              {/* 최신 챌린지*/}
              <div className={styles.myChallenge}>
                <Skeleton className={styles.myTitle}>
                  <div>최신</div>
                  <div>챌린지</div>
                </Skeleton>
                <Skeleton variant="rectangular">
                  <MainChallengeList challenges={loadedRecentChallengeList} />
                </Skeleton>
              </div>
              {/* 추천 챌린지*/}
              <div className={styles.recommendChallenge}>
                <Skeleton width={300} height={80} />
                <Skeleton variant="rectangular">
                  <MainRecomChallengeList challenges={recommendChallengeList} />
                </Skeleton>
              </div>
              <div style={{ height: 50 }} />
              {/* 인기 챌린지 */}
              <div className={styles.popChallenge}>
                <Skeleton width={300} height={80} />
                <Skeleton variant="rectangular" width={992} height={500} />
              </div>
              <div style={{ height: 110 }} />
              {/* 인기순 포스팅 */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Skeleton width={200} height={80} />
              </div>
              <Skeleton width={1000} height={450} />

              <div style={{ height: 110 }} />
              <Skeleton variant="rectangular" width={1000} height={1000} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
