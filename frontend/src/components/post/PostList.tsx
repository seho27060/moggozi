import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import PostItem from "./PostItem";
import {
  setModalPostState,
  setPostModalStageId,
  setPostModalOpen,
} from "../../store/postModal";
import { PostData } from "../../store/post";

import styles from "./PostList.module.scss";

const PostList: React.FC<{
  posts: PostData[] | null;
}> = ({ posts }) => {
  const dispatch = useDispatch();
  const postList = [...posts!];
  postList!.sort((a: PostData, b: PostData) => (a.id >= b.id ? 1 : -1));

  return (
    <div className={styles.postList}>
      {/* PostList */}

      {!postList.length && (
        <div className={styles.none}>아직 등록된 포스트가 없어요!</div>
      )}

      {postList!.map((post) => (
        <div key={post.id}>
          <div
            className={styles.postItem}
            onClick={(event: MouseEvent) => {
              event.preventDefault();
              dispatch(setModalPostState(post));
              dispatch(setPostModalOpen(true));
              dispatch(setPostModalStageId);
            }}
          >
            <div>
              <PostItem post={post} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PostList;
