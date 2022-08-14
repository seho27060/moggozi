import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostDetailItem from "../../components/post/PostDetailItem";
import PostPageList from "../../components/post/PostPageList";
import Loader from "../../components/ui/Loader";
import PostModal from "../../components/ui/PostModal";
import { fetchPostLikeList, fetchPostRecentList } from "../../lib/withTokenApi";
import { PostData } from "../../store/post";
import {
  // setPostFormModalOpen,
  setPostModalOpen,
  // setPostUpdateFormState,
} from "../../store/postModal";
import { RootState } from "../../store/store";

import styles from "./PostAll.module.scss";

const PostAll: React.FC = () => {
  const dispatch = useDispatch();
  const [likePostList, setLikePostList] = useState<PostData[]>([]);
  const [recentPostList, setRecentPostList] = useState<PostData[]>([]);
  const [isLogging, setIsLogging] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const user = useSelector((state: RootState) => state.auth.userInfo);
  const { postModalOpen } = useSelector((state: RootState) => state.postModal);

  const closePostModal = () => {
    dispatch(setPostModalOpen(false));
  };

  if (postModalOpen) {
    document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함
    document.body.style.height = "auto";
  }

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      console.log(currentPage);
      setIsLogging(true);

      fetchPostRecentList(currentPage, 15)
        .then((res) => {
          console.log(1);
          setRecentPostList(recentPostList.concat(res.content));
          setTimeout(() => setIsLogging(false), 300);
        })
        .catch((err) => console.log(err));
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, recentPostList]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  useEffect((): void => {
    setIsLogging(true);
    fetchPostLikeList(0, 3)
      .then((res) => {
        console.log("postlikelist", res);
        setLikePostList(res.content);
      })
      .catch((err) => console.log("likepostlist err", err));
    fetchPostRecentList(0, 15)
      .then((res) => {
        console.log("fisrt call", res);
        setRecentPostList(res.content);
        setIsLogging(false);
      })
      .catch((err) => {
        console.log("err", err);
        setIsLogging(false);
      });
  }, [dispatch, user.id]);

  return (
    <div>
      <div className={styles.display}>
        <div className={styles.container}>
          <div className={styles.postingTitle}>인기 포스팅</div>
          <PostPageList postList={likePostList} />
          <div className={styles.postingTitle}>최신 포스팅</div>
          <PostPageList postList={recentPostList} />
        </div>

        <div>
          {postModalOpen && (
            <PostModal open={postModalOpen} close={closePostModal}>
              <PostDetailItem />
            </PostModal>
          )}
        </div>
      </div>
      {isLogging && <Loader />}
    </div>
  );
};

export default PostAll;
