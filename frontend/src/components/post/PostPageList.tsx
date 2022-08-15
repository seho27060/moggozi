import PostingPageItem from "./PostingPageItem";
import { PostData } from "../../store/post";

import styles from "./PostPageList.module.scss";

const PostPageList: React.FC<{ postList: PostData[] }> = ({ postList }) => {
  return (
    <div className={styles.display}>
      <div>
        <div className={styles.container}>
          {postList!.map((post: PostData) => {
            return (
              <div key={post.id}>
                <div>
                  <>
                    <PostingPageItem post={post} />
                  </>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default PostPageList;
