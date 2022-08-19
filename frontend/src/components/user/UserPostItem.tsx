import { MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postRead } from "../../lib/withTokenApi";
import { PostData } from "../../store/post";
import { setModalPostState, setPostModalOpen } from "../../store/postModal";
import { UserPostType } from "../../store/userPage";

import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./UserPostItem.module.scss";
import no_image from "../../asset/no_image.png";

const UserPostItem: React.FC<{
  userPost: UserPostType;
  nameCheck: boolean;
}> = ({ userPost, nameCheck }) => {
  const [postData, setPostData] = useState<PostData[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    postRead(userPost.id)
      .then((res) => {
        setPostData(res);
      })
      .catch((err) => console.log("err post", userPost.id, err));
  }, [userPost.id]);

  // console.log(userPost.likeNum)

  return (
    <div
      className={styles.link}
      onClick={(event: MouseEvent) => {
        event.preventDefault();
        dispatch(setModalPostState(postData!));
        dispatch(setPostModalOpen(true));
      }}
    >
      <div>
        <div className={styles.img}>
          <img
            src={
              userPost.postImg?.length !== 0
                ? userPost.postImg[0].path!
                : no_image
            }
            alt="challengeImg"
          />
        </div>
        {nameCheck && (
          <div className={styles.itemTitle}>
            <div className={styles.title}>{userPost.title}</div>
            <div className={styles.iconBox}>
              <FavoriteIcon />
              <div>{userPost.likeNum}</div>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default UserPostItem;
