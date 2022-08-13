import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { otherUserDetail } from "../../lib/generalApi";
import { followApi, myPageChallenge, myPagePost } from "../../lib/withTokenApi";

import MypageFollow from "../../components/accounts/MypageFollow";

import styles from "./UserPage.module.scss";

import { WebSocketContext } from "../../lib/WebSocketProvider";
import { Alert } from "../../store/alert";

import { UserChallengeType, UserPostType } from "../../store/userPage";
import UserChallengeItem from "../../components/user/UserChallengeItem";
import UserPostItem from "../../components/user/UserPostItem";

import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";

import {
  setPostModalOpen,
  setPostUpdateFormState,
} from "../../store/postModal";
import PostDetailItem from "../../components/post/PostDetailItem";
import PostUpdateForm from "../../components/post/PostUpdateForm";
import PostModal from "../../components/ui/PostModal";

import { BiDownArrow, BiUpArrow } from "react-icons/bi";

function UserPage() {
  const { postModalOpen, postUpdateFormOpen } = useSelector(
    (state: RootState) => state.postModal
  );
  const dispatch = useDispatch();

  const userId = Number(useParams().id);
  // console.log(userId)
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
  const [postList, setPostList] = useState<UserPostType[]>([]);

  const [isChallengeToggle, setIsChallengeToggle] = useState(false);
  const [isPostToggle, setIsPostToggle] = useState(false);

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

        myPageChallenge(userId)
          .then((res) => {
            console.log(userId, "ch", res);
            setChallengeList([...res.content]);
          })
          .catch((err) => console.log("ch err", err));
        myPagePost(userId)
          .then((res) => {
            console.log(userId, "post", res);
            setPostList([...res.content]);
          })
          .catch((err) => console.log("post err", err));
      })
      .catch((err) => {
        // alert("오류가 발생했습니다.")
        console.log(err);
      });
  }, [userId, loginData]);

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
    <div>
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
              <button onClick={followHandler} className={styles.followButton}>
                {" "}
                {followState ? "♥ 언팔로우" : "♥ 팔로우"}
              </button>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {isPrivate ? <div>블러 처리 가림막</div> : <div>보여주기</div>}
      <div>
        <p
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            padding: "1rem 3.3rem",
            fontFamily: "ui-serif",
          }}
        >
          {nickname}의 챌린지
        </p>

        <Grid container spacing={2} style={{ minHeight: "20rem" }}>
          {challengeList.slice(0, 8).map((challenge) => (
            <Grid key={challenge.id} item xs={3}>
              <UserChallengeItem userChallenge={challenge} />
            </Grid>
          ))}
        </Grid>
        {challengeList.length > 8 && (
          <div
            onClick={() => setIsChallengeToggle(!isChallengeToggle)}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {isChallengeToggle ? (
              <BiUpArrow style={{ fontSize: "3rem", color: "#9b78ff" }} />
            ) : (
              <BiDownArrow style={{ fontSize: "3rem", color: "#9b78ff" }} />
            )}
          </div>
        )}
        {isChallengeToggle && challengeList.length > 8 && (
          <>
            <Grid container spacing={2} style={{ minHeight: "20rem" }}>
              {challengeList.slice(8).map((challenge) => (
                <Grid key={challenge.id} item xs={3}>
                  <UserChallengeItem userChallenge={challenge} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        <hr
          style={{ border: "solid 3px", color: "#9b78ff", margin: "1rem 4rem" }}
        />
        <p
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            padding: "1rem 3.3rem",
            fontFamily: "ui-serif",
          }}
        >
          {nickname}의 포스트
        </p>
        <Grid container spacing={2} style={{ minHeight: "20rem" }}>
          {postList.slice(0, 8).map((post) => (
            <Grid key={post.id} item xs={3}>
              <UserPostItem userPost={post} />
            </Grid>
          ))}
        </Grid>
        {postList.length > 8 && (
          <div
            onClick={() => setIsPostToggle(!isPostToggle)}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {isPostToggle ? (
              <BiUpArrow style={{ fontSize: "3rem", color: "#9b78ff" }} />
            ) : (
              <BiDownArrow style={{ fontSize: "3rem", color: "#9b78ff" }} />
            )}
          </div>
        )}
        {isPostToggle && postList.length > 8 && (
          <>
            <Grid container spacing={2} style={{ minHeight: "20rem" }}>
              {postList.slice(8).map((post) => (
                <Grid key={post.id} item xs={3}>
                  <UserPostItem userPost={post} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>

      <div>
        {postModalOpen && (
          <PostModal open={postModalOpen} close={closePostModal}>
            {!postUpdateFormOpen && <PostDetailItem />}
            {postUpdateFormOpen && <PostUpdateForm />}
          </PostModal>
        )}
      </div>
    </div>
  );
}

export default UserPage;
