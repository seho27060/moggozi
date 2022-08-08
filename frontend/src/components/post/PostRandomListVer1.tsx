import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PostItem from "./PostItem";
import { setModalPostState, setPostModalState } from "../../store/postModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setPostStageList } from "../../store/postStage";
import { postRandomRead } from "../../lib/withTokenApi";
import Loader from "../ui/Loader";

const PostRandomList: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { postStageList, postCount } = useSelector(
    (state: RootState) => state.postStage
  );

  const [isLogging, setIsLogging] = useState(false)
  let postCountStart = postCount;

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (Math.round(scrollTop + innerHeight) > scrollHeight) {
      postRandomRead(16).then((res) => {
        console.log("infinite call ver1");
        setIsLogging(true)
        dispatch(setPostStageList(res));
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
    <div>
      <hr />
      PostList
      {postStageList!.map(
        (post) => (
          addPostCount(),
          (
            <div key={postCountStart}>
              <PostItem post={post} />
              <button
                onClick={(event: MouseEvent) => {
                  event.preventDefault();
                  dispatch(setModalPostState(post));
                  dispatch(setPostModalState(true));
                }}
              >
                해당 포스팅 열기
              </button>
              <hr />
            </div>
          )
        )
      )}
      {isLogging && <Loader/>}
    </div>
  );
};
export default PostRandomList;
