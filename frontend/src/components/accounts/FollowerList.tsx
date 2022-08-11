import { RootState } from "../../store/store";
import React, { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { followApi } from "../../lib/withTokenApi";

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
    <div style={{ display: "flex", margin: "30px" }}>
      <div onClick={moveHandler}>
        <img src={`${img}`} alt="profile_image" style={{ width: "60px" }} />
      </div>
      <p onClick={moveHandler}>{nickname}</p>
      {userId === id ? (
        <div>&nbsp;</div>
      ) : (
        <button onClick={followHandler}>
          {followState ? "언팔로우" : "팔로우"}
        </button>
      )}
    </div>
  );
};

export default FollowerList;
