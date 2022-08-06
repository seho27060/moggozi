import { RootState } from "../../store/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { followedApi, followingApi } from "../../lib/withTokenApi";
import { followed, following } from "../../store/auth";
import styles from "./MypageFollow.module.scss";

import Modal from "../ui/FollowModal";
import FollowerList from "./FollowerList";
import FollowingList from "./FollowingList";

const MypageFollow = () => {
  const userId = Number(
    useSelector((state: RootState) => state.auth.userInfo.id)
  );
  const toId = Number(useParams().id);

  const [followedCnt, setFollowedCnt] = useState(0);
  const [followingCnt, setFollowingCnt] = useState(0);

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
    followedApi(toId, userId)
      .then((res) => {
        setFollowedCnt(res.totalCount);
        setFollowedInfo(res.memberInfoList);
      })
      .catch((err) => {
        console.log(err);
      });

    followingApi(toId)
      .then((res) => {
        setFollowingCnt(res.totalCount);
        setFollowingInfo(res.memberInfoList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toId, userId]);

  return (
    <div className={styles.margin}>
      <span onClick={followedModalHandler}>팔로워: {followedCnt}</span> |
      <span onClick={followingModalHandler}>팔로잉: {followingCnt}</span>
      <Modal open={followedOpenModal} close={CloseModalHandler} header="팔로워">
        {!!followedInfo.length ? (
          <div>
            {followedInfo.map((object) => (
              <FollowerList
                key={object.id}
                id={object.id}
                userImg={object.userImg}
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
        {!!followingInfo.length ?
        <div>{followingInfo.map((object) => (
          <FollowingList
            key={object.id}
            id={object.id}
            userImg={object.userImg}
            nickname={object.nickname}
            close={CloseModalHandler}
          />
        ))}</div> : "팔로잉이 없습니다."}
      </Modal>
    </div>
  );
};

export default MypageFollow;
