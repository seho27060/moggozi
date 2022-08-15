import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./FollowingList.module.scss";

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
    <div className={styles.container}>
      <div className={styles.followers}>
        {img ? (
          <img src={`${img}`} alt="profile_image" onClick={moveHandler} />
        ) : (
          <img
            src="https://img1.daumcdn.net/thumb/C176x176/?fname=https://k.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg"
            alt=""
          />
        )}
        <div onClick={moveHandler}>{nickname}</div>
      </div>
    </div>
  );
};

export default FollowingList;
