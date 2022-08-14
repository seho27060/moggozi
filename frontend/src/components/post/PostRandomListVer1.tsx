import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PostingPageItem from "./PostingPageItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setPostStageList } from "../../store/postStage";
import { postRandomRead } from "../../lib/withTokenApi";
import Loader from "../ui/Loader";
import { PostData } from "../../store/post";

import styles from "./PostRandomListVer1.module.scss"

const PostRandomList: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { postStageList, postCount } = useSelector(
    (state: RootState) => state.postStage
  );

  const [isLogging, setIsLogging] = useState(false);
  let postCountStart = postCount;

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (Math.round(scrollTop + innerHeight) > scrollHeight) {
      postRandomRead(9).then((res) => {
        console.log("infinite call ver1");
        setIsLogging(true);
        dispatch(setPostStageList(res));
        setTimeout(() => setIsLogging(false), 300);
      });
    }
  }, [dispatch]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  const addPostCount = () => {
    postCountStart += 1;
  };
  return (
    <div className={styles.display}>
      <div>
        <div className={styles.postingTitle}>포스팅</div>
        <div className={styles.container}>
          {postStageList!.map((post: PostData) => {
            addPostCount();
            return(<div key={postCountStart}>
              <div>
              <>
                <PostingPageItem post={post}/>
              </>
              </div>
            </div>)
          })}
          {isLogging && <Loader />}
        </div>
      </div>
    </div>
  );
};
export default PostRandomList;
