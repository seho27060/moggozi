import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { followedApi, followingApi } from "../../lib/withTokenApi";
import { followed, following } from "../../store/auth";

import FollowModal from "../ui/FollowModal";
import FollowerList from "./FollowerList";
import FollowingList from "./FollowingList";

import styles from "./MypageFollow.module.scss";

interface Props {
  followedCnt: number;
  followingCnt: number;
}

const MypageFollow = (props: Props) => {
  const { followedCnt, followingCnt } = props;
  const toId = Number(useParams().id);

  const [followedOpenModal, setFollowedOpenModal] = useState(false);
  const [followingOpenModal, setFollowingOpenModal] = useState(false);

  const [followedInfo, setFollowedInfo] = useState<followed[]>([]);
  const [followingInfo, setFollowingInfo] = useState<following[]>([]);

  const CloseModalHandler = () => {
    setFollowedOpenModal(false);
    setFollowingOpenModal(false);
  };

  const followedModalHandler = () => {
    document.body.style.overflow = "hidden";
    setFollowedOpenModal(true);
  };

  const followingModalHandler = () => {
    document.body.style.overflow = "hidden";
    setFollowingOpenModal(true);
  };

  useEffect(() => {
    followedApi(toId)
      .then((res: { totalCount: number; memberInfoList: followed[] }) => {
        setFollowedInfo(res.memberInfoList);
      })
      .catch((err) => {
        console.log(err);
      });

    followingApi(toId)
      .then((res: { totalCount: number; memberInfoList: followed[] }) => {
        setFollowingInfo(res.memberInfoList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toId]);

  return (
    <div>
      <div>
        <span onClick={followedModalHandler} className={styles.follow}>
          팔로워{" "}
        </span>
        <span className={styles.cnt} style={{ marginRight: "10px" }}>
          {followedCnt}
        </span>{" "}
        <span className={styles.line}></span>
        <span
          onClick={followingModalHandler}
          className={styles.follow}
          style={{ marginLeft: "10px" }}
        >
          {" "}
          팔로잉{" "}
        </span>
        <span className={styles.cnt}> {followingCnt}</span>
      </div>
      <FollowModal open={followedOpenModal} close={CloseModalHandler} header="팔로워">
        {/* {followedOpenModal
          ? (document.body.style.overflow = "hidden")
          : (document.body.style.overflow = "visible")} */}
        {!!followedInfo.length ? (
          <div>
            {followedInfo.map((object) => (
              <FollowerList
                key={object.id}
                id={object.id}
                img={object.userImg}
                loginFollowState={object.loginFollowState}
                nickname={object.nickname}
                close={CloseModalHandler}
              />
            ))}
          </div>
        ) : (
          "팔로워가 없습니다"
        )}
      </FollowModal>
      <FollowModal
        open={followingOpenModal}
        close={CloseModalHandler}
        header="팔로잉"
      >
        {/* {followingOpenModal
          ? (document.body.style.overflow = "hidden")
          : (document.body.style.overflow = "visible")} */}
        {!!followingInfo.length ? (
          <div style={{ height: "15rem", overflowY: "auto" }}>
            {followingInfo.map((object) => (
              <FollowingList
                key={object.id}
                id={object.id}
                img={object.userImg}
                nickname={object.nickname}
                close={CloseModalHandler}
              />
            ))}
          </div>
        ) : (
          "팔로잉이 없습니다."
        )}
      </FollowModal>
    </div>
  );
};

export default MypageFollow;
