import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { followedApi, followingApi } from "../../lib/withTokenApi";
import { followed, following } from "../../store/auth";

import Modal from "../ui/FollowModal";
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
    setFollowedOpenModal(true);
  };

  const followingModalHandler = () => {
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
      <Modal open={followedOpenModal} close={CloseModalHandler} header="팔로워">
        {!!followedInfo.length ? (
          <div>
            {followedInfo.map((object) => (
              <FollowerList
                key={object.id}
                id={object.id}
                img={object.img}
                loginFollowState={object.loginFollowState}
                nickname={object.nickname}
                close={CloseModalHandler}
              />
            ))}
          </div>
        ) : (
          "팔로워가 없습니다"
        )}
      </Modal>
      <Modal
        open={followingOpenModal}
        close={CloseModalHandler}
        header="팔로잉"
      >
        {!!followingInfo.length ? (
          <div>
            {followingInfo.map((object) => (
              <FollowingList
                key={object.id}
                id={object.id}
                img={object.img}
                nickname={object.nickname}
                close={CloseModalHandler}
              />
            ))}
          </div>
        ) : (
          "팔로잉이 없습니다."
        )}
      </Modal>
    </div>
  );
};

export default MypageFollow;
