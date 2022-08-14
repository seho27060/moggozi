import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostDetailItem from "../../components/post/PostDetailItem";
import PostRandomList from "../../components/post/PostRandomListVer1";
import PostModal from "../../components/ui/PostModal";
import { postRandomRead } from "../../lib/withTokenApi";
import { PostData } from "../../store/post";
import {
  // setPostFormModalOpen,
  setPostModalOpen,
  // setPostUpdateFormState,
} from "../../store/postModal";
import { setPostStageList } from "../../store/postStage";
import { RootState } from "../../store/store";

const PostAll: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const {
    postModalOpen,
    // postFormModalOpen,
    // postUpdateFormOpen,
    // postFormButtonOpen,
  } = useSelector((state: RootState) => state.postModal);
  const closePostModal = () => {
    dispatch(setPostModalOpen(false));
  };
  if (postModalOpen) {
    document.body.style.overflow = "auto"; //모달때문에 이상하게 스크롤이 안되서 강제로 스크롤 바 생성함
    document.body.style.height = "auto";
  }

  useEffect((): void => {
    postRandomRead(9)
      .then((res: PostData[]) => {
        console.log("fisrt call", res);
        const filteredRes = res.filter((post) => post.writer!.id !== user.id);
        dispatch(setPostStageList(filteredRes));
      })
      .catch((err) => console.log("err", err));
  }, [dispatch, user.id]);
  return (
    <div>
      <PostRandomList />
      <div>
        {postModalOpen && (
          <PostModal
            open={postModalOpen}
            close={closePostModal}
          >
            <PostDetailItem />
          </PostModal>
        )}   
      </div>
    </div>
  );
};

export default PostAll;
