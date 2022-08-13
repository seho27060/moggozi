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
    <div
      style={{
        display: "flex",
        margin: "1rem",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "contents" }}>
        <img
          src={`${img}`}
          alt="profile_image"
          style={{ width: "2rem", height: "2rem" }}
          onClick={moveHandler}
        />
        <div
          onClick={moveHandler}
          style={{ marginTop: "0.5rem", width: "5rem", textAlign: "end" }}
        >
          {nickname}
        </div>
      </div>

      {userId === id ? (
        <div>&nbsp;</div>
      ) : (
        <button
          onClick={followHandler}
          style={{
            width: "4.3rem",
            fontSize:"0.75rem",
            color:"#9b78ff",
            margin: "0",
            background: "white",
            borderColor: "#9b78ff",
            borderRadius: "5px",
            border: "solid #9b78ff 2px",
          }}
        >
          {followState ? "언팔로우" : "팔로우"}
        </button>
      )}
    </div>
  );
};

export default FollowerList;
