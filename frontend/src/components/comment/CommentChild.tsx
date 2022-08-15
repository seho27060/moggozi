import { useSelector } from "react-redux";
import { Comment } from "../../store/comment";
import { RootState } from "../../store/store";

import styles from "./CommentChild.module.scss";
import CommentOptionBtn from "./CommentOptionBtn";

import { BsFillPersonFill } from "react-icons/bs"
import { useState } from "react";
import CommentUpdateForm from "./CommentUpdateForm";
const CommentChild: React.FC<{ child: Comment }> = ({ child }) => {
  
  const postId = useSelector(
    (state: RootState) => state.postModal.postModalState!.id
  );
  const [commentUpdateFormToggle, setCommentUpdateFormToggle] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.writer}>
        <div className={styles.profile}>
          {child.writer?.path ? (
            <img
              className={styles.img}
              src={child.writer?.path}
              alt=""
              style={{ height: "43px", width: "43px" }}
            />
          ) : (
            <BsFillPersonFill
              // className={styles.img}
              // src="https://blog.kakaocdn.net/dn/vckff/btqCjeJmBHM/tMVpe4aUIMfH4nKS4aO3tK/img.jpg"
              // alt=""
              style={{ height: "43px", width: "43px" }}
            />
          )}
          {/* <p>{child.order}</p> */}
          <div>{child.writer?.nickname}</div>
        </div>
        <div className={styles.option}>
          <CommentOptionBtn comment={child} postId={postId} setCommentUpdateFormToggle={setCommentUpdateFormToggle}/>
        </div>
      </div>
      <div>
        <div className={styles.comment}>
          {/* {child.text} */}
          {!commentUpdateFormToggle ? (
            child.text
          ) : (
            <CommentUpdateForm
              comment={child}
              postId={postId}
              setCommentUpdateFormToggle={setCommentUpdateFormToggle}
            />
          )}
          </div>
        <div className={styles.date}>
          {child.modifiedTime?.toString().slice(0, 4)}년{" "}
          {child.modifiedTime?.toString().slice(6, 7)}월{" "}
          {child.modifiedTime?.toString().slice(8, 10)}일
        </div>
      </div>
    </div>
  );
};

export default CommentChild;
