import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { postRead } from "../../lib/withTokenApi";
import { PostData } from "../../store/post";
import { setModalPostState, setPostModalOpen } from "../../store/postModal";
import { UserPostType } from "../../store/userPage";

import styles from "./UserChallengeItem.module.scss";

const UserPostItem: React.FC<{
  userPost: UserPostType;
  nameCheck: boolean;
}> = ({ userPost, nameCheck }) => {
  const dispatch = useDispatch();
  let postData: PostData | null = null;
  postRead(userPost.id)
    .then((res) => {
      // console.log(res);
      postData = res;
    })
    .catch((err) => console.log("err post", userPost.id, err));
  return (
    <div
      // style={{
      //   border: "solid 1px",
      //   width: "13.5rem",
      //   height: "13.5rem",
      //   margin: "1rem",
      //   borderRadius: "5px",
      // }}
      className={styles.link}
      onClick={(event: MouseEvent) => {
        event.preventDefault();
        dispatch(setModalPostState(postData!));
        dispatch(setPostModalOpen(true));
      }}
    >
      <div className={styles.img}>
        <img
          src={userPost.postImg?.length !== 0 ? userPost.postImg[0].path! : ""}
          alt="challengeImg"
        />
        {nameCheck && <div className={styles.itemTitle}>{userPost.title}</div>}
      </div>
    </div>
  );
};

export default UserPostItem;
