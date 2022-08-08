import { MouseEvent } from "react";
import { useSelector } from "react-redux";
import { postLike } from "../../lib/withTokenApi";
import { RootState } from "../../store/store";
import { setModalPostState } from "../../store/postModal";
import { useDispatch } from "react-redux";
import { PostData, postModify } from "../../store/post";

const PostLikeBtn: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const postModal = useSelector((state: RootState) => state.postModal);
  const liked = postModal.postModalState.liked;
  const user = useSelector((state: RootState) => state.auth.userInfo);
  let likeNum = postModal.postModalState.likeNum!;

  const postLikeHandler = (event: MouseEvent) => {
    if (user.id) {
      if (liked) {
        likeNum -= 1;
      } else {
        likeNum += 1;
      }
      event.preventDefault();
      console.log(postModal);
      postLike(postModal.postModalState.id).then((res) => {
        console.log(postModal.postModalState.id, `${!liked} 완료`, res);
        const modifiedModalPost: PostData = {
          id: postModal.postModalState!.id!,
          title: postModal.postModalState!.title,
          content: postModal.postModalState!.content,
          postImg: postModal.postModalState!.postImg,
          createdTime: postModal.postModalState!.createdTime,
          modifiedTime: postModal.postModalState!.modifiedTime,
          writer: postModal.postModalState!.writer,
          liked: !liked,
          likeNum: likeNum,
        };
        dispatch(postModify(modifiedModalPost));
        dispatch(setModalPostState(modifiedModalPost));
      });
    }
  };

  return (
    <div>
      <button onClick={postLikeHandler}>{liked ? "Unlike" : "Like"}</button>
    </div>
  );
};

export default PostLikeBtn;
