import { useEffect, useState } from "react";
import { PostData } from "../../store/post";
import { setModalPostState, setPostModalOpen } from "../../store/postModal";

import Modal from "../ui/Modal";

import default_profile from "../../asset/default_profile.png";
import no_image from "../../asset/no_image.png";
import styles from "./PostingPageItem.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostingPageItem: React.FC<{ post: PostData }> = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "unset";
  }, []);

  const closeModal = () => {
    setOpenModal(false);
    document.body.style.overflow = "unset";
  };

  const urlCopy = (event: React.MouseEvent) => {
    event.stopPropagation();
    var dummy = document.createElement("input");
    var text = `https://i7c201.p.ssafy.io/user/${post.writer?.id}`;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setOpenModal(true);
    document.body.style.overflow = "hidden";
    // alert("해당 유저의 마이페이지 url이 복사되었습니다.")
  };

  return (
    <div className={styles.postItem}>
      <div className={styles.header}>
        <div
          style={{ display: "flex", cursor: "pointer" }}
          onClick={() => {
            navigate(`/user/${post.writer?.id}`);
          }}
        >
          {post.writer?.path !== "" && post.writer?.path ? (
            <img src={post.writer?.path} alt="" />
          ) : (
            <img src={default_profile} alt="" />
          )}
          <div className={styles.userInfo}>
            <div className={styles.writer}>{post.writer?.nickname}</div>
            {post.title!.length > 18 ? (
              <div>{post.title?.slice(0, 18) + "..."}</div>
            ) : (
              <div>{post.title}</div>
            )}
          </div>
        </div>
        <div className={styles.shared} onClick={urlCopy}>
          <ShareIcon />
        </div>
      </div>

      <div className={styles.overflow}>
        {post.postImg!.length !== 0 ? (
          <img
            onClick={(event: React.MouseEvent) => {
              event.preventDefault();
              dispatch(setModalPostState(post));
              dispatch(setPostModalOpen(true));
            }}
            className={styles.postImg}
            src={post.postImg![0].path!}
            alt=""
          />
        ) : (
          <img
            className={styles.postImg}
            src={no_image}
            alt=""
            onClick={(event: React.MouseEvent) => {
              event.preventDefault();
              dispatch(setModalPostState(post));
              dispatch(setPostModalOpen(true));
            }}
          />
        )}
      </div>

      <div className={styles.title}>
        <div className={styles.name}>
          <FavoriteIcon /> <div>{post.likeNum}</div>
        </div>
      </div>

      <Modal open={openModal} close={closeModal} header="안내">
        <div>해당 유저의 URL이 복사되었습니다!</div>
      </Modal>
    </div>
  );
};
export default PostingPageItem;
