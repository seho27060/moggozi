import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import PostItem from "./PostItem";
import { setModalPostState, setPostModalState } from "../../store/postModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setPostStageList } from "../../store/postStage";
import { postRandomRead } from "../../lib/withTokenApi";

import Loader from "../ui/Loader";
import useIntersectionObserver from "../../lib/infiniteScroll";
import { PostData } from "../../store/post";

const PostRandomList: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state:RootState) => state.auth.userInfo)
  const { postStageList, postCount } = useSelector(
    (state: RootState) => state.postStage
  );

  let postCountStart = postCount;
  const addPostCount = () => {
    postCountStart += 1;
  };
  const getMoreItem = () => {
    setIsLoaded(true);
    postRandomRead(16)
      .then((res:PostData[]) => {
        console.log("infinite call ver2");
        const filteredPostStageList = res!.filter((post)=>{
          post.writer!.id !== user.id
        })
        dispatch(setPostStageList(filteredPostStageList));
      })
      .catch((err) => {
        console.log("err", err);
      });
    setIsLoaded(false);
  };
  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    //보통 교차여부만 확인하는 것 같다. 코드는 로딩상태까지 확인함.
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    onIntersect,
  });

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
      <div ref={setTarget}>{isLoaded && <Loader />}</div>
    </div>
  );
};
export default PostRandomList;
