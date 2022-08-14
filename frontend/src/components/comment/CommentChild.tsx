import { useSelector } from "react-redux";
import { Comment } from "../../store/comment";
import { RootState } from "../../store/store";

import styles from "./CommentChild.module.scss";
import CommentOptionBtn from "./CommentOptionBtn";

const CommentChild: React.FC<{ child: Comment }> = ({ child }) => {
  const postId = useSelector(
    (state: RootState) => state.postModal.postModalState!.id
  );
  return (
    <div className={styles.container}>
      <div className={styles.writer}>
        <div className={styles.profile}>
          <img src={child.writer?.path} alt="" style={{height:"43px",width:"43px"}}/>
          {/* <p>{child.order}</p> */}
          <div>{child.writer?.nickname}</div>
        </div>
        <div className={styles.option}>
          <CommentOptionBtn comment={child} postId={postId} />
        </div>
      </div>
      <div>
        <div className={styles.comment}>{child.text}</div>
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
