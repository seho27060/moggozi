import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { otherUserDetail } from "../../lib/generalApi";
import { followApi } from "../../lib/withTokenApi";

import MypageFollow from "../../components/accounts/MypageFollow";

import styles from "./UserPage.module.scss";
import { WebSocketContext } from "../../lib/WebSocketProvider";
import { Alert } from "../../store/alert";

function UserPage() {
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

  useEffect(() => {
    otherUserDetail(userId, loginData.userInfo.id)
      .then((res) => {
        setNickname(res.nickname);
        setIntroduce(res.introduce);
        setIsPrivate(res.isPrivate);
        setFollowState(res.isFollowing);
        setFollowedCnt(res.followedCnt);
        setFollowingCnt(res.followingCnt);
        if (!!res.userImg == false) {
          // 기본 프로필 이미지
          setImg(
            "https://i.pinimg.com/236x/f2/a1/d6/f2a1d6d87b1231ce39710e6ba1c1e129.jpg"
          );
        } else {
          setImg(res.userImg);
        }
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
            {/* {img ? (
              <div
                className={styles.editImg}
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            ) : (
              <div
                className={styles.editImg}
                style={{
                  backgroundImage: `url("https://i.pinimg.com/236x/f2/a1/d6/f2a1d6d87b1231ce39710e6ba1c1e129.jpg")`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            )} */}
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
    </div>
  );
}

export default UserPage;
