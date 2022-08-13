import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number | null;
  img: string | null;
  nickname: string | null;
  close: () => void;
}

const FollowingList = (props: Props): ReactElement => {
  const navigate = useNavigate();
  const { id, img, nickname, close } = props;

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
        <button
          style={{
            display: "hidden",
            width: "4.3rem",
            fontSize: "0.75rem",
            color: "#9b78ff",
            margin: "0",
            background: "white",
          }}
        ></button>
      </div>
    </div>
  );
};

export default FollowingList;
