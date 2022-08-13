import { RootState } from "../../store/store";
import React, { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followApi } from "../../lib/withTokenApi";

import styles from "./FollowerList.module.scss";

interface Props {
  id: number | null;
  img: string | null;
  loginFollowState: number | null;
  nickname: string | null;
  close: () => void;
}

const FollowerList = (props: Props): ReactElement => {
  const navigate = useNavigate();
  const userId = Number(
    useSelector((state: RootState) => state.auth.userInfo.id)
  );
  const { id, img, loginFollowState, nickname, close } = props;

  const [followState, setFollowState] = useState(!!loginFollowState);

  function followHandler(event: React.MouseEvent) {
    event.preventDefault();
    setFollowState(!followState);
    followApi(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function moveHandler() {
    navigate(`/user/${id}`);
    close();
  }

  return (
    <div className={styles.container}>
      <div className={styles.followers}>
        { img ? <img src={`${img}`} alt="profile_image" onClick={moveHandler} /> : <img src="https://img1.daumcdn.net/thumb/C176x176/?fname=https://k.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg" alt="" />}
        
        <div onClick={moveHandler}>{nickname}</div>
      </div>

      {userId === id ? (
        <div>&nbsp;</div>
      ) : (
        <button onClick={followHandler}>
          {followState ? "unfollow" : "follow"}
        </button>
      )}
    </div>
  );
};

export default FollowerList;
