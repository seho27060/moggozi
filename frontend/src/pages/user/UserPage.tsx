import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { otherUserDetail } from "../../lib/generalApi";
import {
  fetchMyChallengeList,
  followApi,
  myPagePost,
  userTryChallenge,
} from "../../lib/withTokenApi";
import MypageFollow from "../../components/accounts/MypageFollow";
import styles from "./UserPage.module.scss";

import { WebSocketContext } from "../../lib/WebSocketProvider";
import { Alert } from "../../store/alert";
import { setUserPagePostList, UserChallengeType } from "../../store/userPage";
import { useDispatch } from "react-redux";
import {
  setPostModalOpen,
  setPostUpdateFormState,
} from "../../store/postModal";
import PostDetailItem from "../../components/post/PostDetailItem";
import PostUpdateForm from "../../components/post/PostUpdateForm";
import PostModal from "../../components/ui/PostModal";
import { ChallengeItemState } from "../../store/challenge";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import UserTabBox from "./UserTabBox";
import { Box, Skeleton } from "@mui/material";
import Loader from "../../components/ui/Loader";
import PostFormModal from "../../components/ui/PostFormModal";

import FavoriteIcon from "@mui/icons-material/Favorite";

function UserPage() {
  const { postModalOpen, postUpdateFormOpen } = useSelector(
    (state: RootState) => state.postModal
  );
  const dispatch = useDispatch();

  const userId = Number(useParams().id);
  const ws = useContext(WebSocketContext);

  const loginData = useSelector((state: RootState) => state.auth);
  const loginId = loginData.userInfo.id;

  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [img, setImg] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const [followedCnt, setFollowedCnt] = useState(0);
  const [followingCnt, setFollowingCnt] = useState(0);
  const [followState, setFollowState] = useState(false);

  const [challengeList, setChallengeList] = useState<UserChallengeType[]>([]);
  // const [postList, setPostList] = useState<UserPostType[]>([]);
  const userUserPagePostList = useSelector(
    (state: RootState) => state.userPage.UserPagePostList
  );

  const [myChallengeList, setMyChallengeList] = useState<ChallengeItemState[]>(
    []
  );
  const [isLogging, setIsLogging] = useState(false);
  const [currentMyChallengePage, setCurrentMyChallengePage] = useState(0);
  const [currentChallengePage, setCurrentChallengePage] = useState(0);
  const [currentPostPage, setCurrentPostPage] = useState(0);
  const [myChallengeHasNext, setMyChallengeHasNext] = useState(false);
  const [challengeHasNext, setChallengeHasNext] = useState(false);
  const [postHasNext, setPostHasNext] = useState(false);

  let tabMenus = ["모두보기", "포스팅", "도전한 챌린지"];
  if (userId === loginId) {
    tabMenus = ["모두보기", "포스팅", "도전한 챌린지", "만든 챌린지"];
  }
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (
      value !== 0 &&
      Math.round(scrollTop + innerHeight) >= scrollHeight - 100
    ) {
      switch (value) {
        case 1: // 내 포스팅
          if (!postHasNext) {
            break;
          }
          setIsLogging(true);
          myPagePost(userId, currentPostPage + 1, 16)
            .then((res) => {
              console.log(userId, "post", res);
              dispatch(
                setUserPagePostList(userUserPagePostList.concat(res.content))
              );
              // setPostList(postList.concat(res.content));/
              setCurrentPostPage(res.pageNum);
              setPostHasNext(res.hasNext);
            })
            .catch((err) => console.log("post err", err));
          break;
        case 2: // 도전한 챌린지
          if (!challengeHasNext) {
            break;
          }
          setIsLogging(true);
          userTryChallenge(userId, currentChallengePage + 1, 16)
            .then((res) => {
              console.log(userId, "ch", res);
              setChallengeList(challengeList.concat(res.content));
              setCurrentChallengePage(res.pageNum);
              setChallengeHasNext(res.hasNext);
            })
            .catch((err) => console.log("ch err", err));
          break;
        case 3: // 만든 챌린지
          if (!myChallengeHasNext) {
            break;
          }
          setIsLogging(true);
          if (userId === loginData.userInfo.id) {
            // 작성한 챌린지
            fetchMyChallengeList(currentMyChallengePage + 1, 16)
              .then((res) => {
                console.log("call my recentrych");
                setMyChallengeList(myChallengeList.concat(res.content));
                setCurrentMyChallengePage(res.pageNum);
                setMyChallengeHasNext(res.hasNext);
              })
              .catch((err) => console.log("myrecentch err", err));
          }
          break;
      }
      setTimeout(() => setIsLogging(false), 300);
    }
  }, [
    currentPostPage,
    currentChallengePage,
    currentMyChallengePage,
    challengeList,
    myChallengeList,
    // postList,
    userUserPagePostList,
    userId,
    value,
    loginData.userInfo.id,
    challengeHasNext,
    myChallengeHasNext,
    postHasNext,
    dispatch,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  useEffect(() => {
    console.log(userId, loginData.userInfo.id);
    otherUserDetail(userId, loginData.userInfo.id)
      .then((res) => {
        setNickname(res.nickname);
        setIntroduce(res.introduce);
        setIsPrivate(res.isPrivate);
        setFollowState(res.isFollowing);
        setFollowedCnt(res.followedCnt);
        setFollowingCnt(res.followingCnt);
        if (!!res.userImg === false) {
          // 기본 프로필 이미지
          setImg(
            "https://i.pinimg.com/236x/f2/a1/d6/f2a1d6d87b1231ce39710e6ba1c1e129.jpg"
          );
        } else {
          setImg(res.userImg);
        }
        // 내 포스팅
        myPagePost(userId, 0, 16)
          .then((res) => {
            console.log(userId, "post", res);
            // setPostList(res.content);
            dispatch(setUserPagePostList(res.content));
            setPostHasNext(res.hasNext);
          })
          .catch((err) => console.log("post err", err));
        // 도전한 챌린지
        userTryChallenge(userId, 0, 16)
          .then((res) => {
            console.log(userId, "ch", res);
            setChallengeList(res.content);
            setChallengeHasNext(res.hasNext);
          })
          .catch((err) => console.log("ch err", err));
        if (userId === loginData.userInfo.id) {
          // 작성한 챌린지
          fetchMyChallengeList(0, 16)
            .then((res) => {
              console.log("call my recentrych");
              setMyChallengeList(res.content);
              setMyChallengeHasNext(res.hasNext);
            })
            .catch((err) => console.log("myrecentch err", err));
        }
      })
      .catch((err) => {
        // alert("오류가 발생했습니다.")
        console.log("otherUserDetail", err);
      });
  }, [userId, loginData, dispatch, loginId]);

  function followHandler(event: React.MouseEvent) {
    event.preventDefault();
    followApi(userId)
      .then((res) => {
        setFollowedCnt(followState ? followedCnt - 1 : followedCnt + 1);
        setFollowState(!followState);
        if (res.message === "Successfully followed.") {
          let jsonSend: Alert = {
            check: 0,
            createdTime: "0",
            id: "0",
            index: userId.toString(),
            message: "follow",
            receiverId: userId.toString(),
            receiverName: nickname!.toString(),
            senderId: loginData.userInfo.id!.toString(),
            senderName: loginData.userInfo.nickname!.toString(),
            type: "follow",
          };
          if (loginData.userInfo.id! !== userId!) {
            ws.current.send(JSON.stringify(jsonSend));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const closePostModal = () => {
    dispatch(setPostModalOpen(false));
    dispatch(setPostUpdateFormState(false));
  };

  return (
    <div className={styles.margin}>
      <div style={{ margin: "20px" }}>
        <a href="#/">공유버튼</a>
      </div>
      <div className={styles.info}>
        {loginId === userId ? (
          <Link
            to={"/account/userUpdate"}
            className={styles.editImg}
            style={{
              backgroundImage: `url(${img})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className={styles.edit}></div>
          </Link>
        ) : (
          <div>
            <div
              className={styles.editImg}
              style={{
                backgroundImage: `url(${img})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        )}

        <div className={styles.nickname}>{nickname}</div>
        {introduce ? (
          <div className={styles.introduce}>{introduce}</div>
        ) : (
          <div></div>
        )}
        <MypageFollow followedCnt={followedCnt} followingCnt={followingCnt} />
        {loginData.isLoggedIn ? (
          <div>
            {loginId === userId ? (
              ""
            ) : (
              <div>
                {followState ? (
                  <div
                    className={styles.unfollowButton}
                    onClick={followHandler}
                  >
                    <FavoriteIcon /> <div>언팔로우</div>
                  </div>
                ) : (
                  <div className={styles.followButton} onClick={followHandler}>
                    <FavoriteIcon /> <div>팔로우</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {isPrivate && userId !== loginId ? (
        <div className={styles.blurEffect}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.container}>
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                borderBottom="2px solid #afafaf"
                margin="50px 0 0 0"
              >
                <Tabs
                  sx={{}}
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  textColor="inherit"
                  TabIndicatorProps={{
                    style: {
                      background: "rgba(81, 255, 20, 0.62)",
                      height: "10px",
                      bottom: "10px",
                    },
                  }}
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                >
                  {tabMenus.map((menus, index) => (
                    <Tab
                      key={index}
                      label={`${menus}`}
                      sx={{
                        fontSize: "20px",
                        fontWeight: "700",
                        fontFamily: "pretendard",
                        textAlign: "center",
                        marginRight: "20px",
                        px: 1,
                      }}
                    />
                  ))}
                </Tabs>
              </Box>
            </div>
          </div>
          <div></div>
          {userId !== loginId ? (
            <>
              {value === 0 && (
                <UserTabBox
                  myChallenges={null}
                  challenges={challengeList.slice(0, 8)}
                  nickname={nickname}
                  posts={userUserPagePostList.slice(0, 8)}
                  nameCheck={false}
                />
              )}
              {value === 1 && (
                <UserTabBox
                  myChallenges={null}
                  challenges={null}
                  nickname={nickname}
                  posts={userUserPagePostList}
                  nameCheck={true}
                />
              )}
              {value === 2 && (
                <UserTabBox
                  myChallenges={null}
                  challenges={challengeList}
                  nickname={nickname}
                  posts={null}
                  nameCheck={true}
                />
              )}
            </>
          ) : (
            <>
              {value === 0 && (
                <UserTabBox
                  myChallenges={myChallengeList.slice(0, 8)}
                  challenges={challengeList.slice(0, 8)}
                  nickname={nickname}
                  posts={userUserPagePostList.slice(0, 8)}
                  nameCheck={false}
                />
              )}
              {value === 1 && (
                <UserTabBox
                  myChallenges={null}
                  challenges={null}
                  nickname={nickname}
                  posts={userUserPagePostList}
                  nameCheck={true}
                />
              )}
              {value === 2 && (
                <UserTabBox
                  myChallenges={null}
                  challenges={challengeList}
                  nickname={nickname}
                  posts={null}
                  nameCheck={true}
                />
              )}
              {value === 3 && (
                <UserTabBox
                  myChallenges={myChallengeList}
                  challenges={null}
                  nickname={nickname}
                  posts={null}
                  nameCheck={true}
                />
              )}
            </>
          )}

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
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.container}>
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                borderBottom="2px solid #afafaf"
                margin="50px 0 0 0"
              >
                <Tabs
                  sx={{}}
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  textColor="inherit"
                  TabIndicatorProps={{
                    style: {
                      background: "rgba(81, 255, 20, 0.62)",
                      height: "10px",
                      bottom: "10px",
                    },
                  }}
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                >
                  {tabMenus.map((menus, index) => (
                    <Tab
                      key={index}
                      label={`${menus}`}
                      sx={{
                        fontSize: "20px",
                        fontWeight: "700",
                        fontFamily: "pretendard",
                        textAlign: "center",
                        marginRight: "20px",
                        px: 1,
                      }}
                    />
                  ))}
                </Tabs>
              </Box>
            </div>
          </div>
          <div></div>
          {userId !== loginId ? (
            <>
              {value === 0 && (
                <UserTabBox
                  myChallenges={null}
                  challenges={challengeList.slice(0, 8)}
                  nickname={nickname}
                  posts={userUserPagePostList.slice(0, 8)}
                  nameCheck={false}
                />
              )}
              {value === 1 && (
                <UserTabBox
                  myChallenges={null}
                  challenges={null}
                  nickname={nickname}
                  posts={userUserPagePostList}
                  nameCheck={true}
                />
              )}
              {value === 2 && (
                <UserTabBox
                  myChallenges={null}
                  challenges={challengeList}
                  nickname={nickname}
                  posts={null}
                  nameCheck={true}
                />
              )}
            </>
          ) : (
            <>
              {value === 0 && (
                <UserTabBox
                  myChallenges={myChallengeList.slice(0, 8)}
                  challenges={challengeList.slice(0, 8)}
                  nickname={nickname}
                  posts={userUserPagePostList.slice(0, 8)}
                  nameCheck={false}
                />
              )}
              {value === 1 && (
                <UserTabBox
                  myChallenges={null}
                  challenges={null}
                  nickname={nickname}
                  posts={userUserPagePostList}
                  nameCheck={true}
                />
              )}
              {value === 2 && (
                <UserTabBox
                  myChallenges={null}
                  challenges={challengeList}
                  nickname={nickname}
                  posts={null}
                  nameCheck={true}
                />
              )}
              {value === 3 && (
                <UserTabBox
                  myChallenges={myChallengeList}
                  challenges={null}
                  nickname={nickname}
                  posts={null}
                  nameCheck={true}
                />
              )}
            </>
          )}

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
      )}
      {isLogging && <Loader />}
    </div>
  );
}

export default UserPage;
