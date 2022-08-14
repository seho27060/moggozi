import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { postRead } from "../../lib/withTokenApi";
import { PostData } from "../../store/post";
import { setModalPostState, setPostModalOpen } from "../../store/postModal";
import { UserPostType } from "../../store/userPage";

const UserPostItem: React.FC<{
  userPost: UserPostType;
}> = ({ userPost }) => {
  const dispatch = useDispatch();
  let postData: PostData | null = null;
  postRead(userPost.id)
    .then((res) => {
      console.log(res);
      postData = res;
    })
    .catch((err) => console.log("err post", userPost.id, err));
  return (
    <div
      style={{
        border: "solid 1px",
        width: "13.5rem",
        height: "13.5rem",
        margin: "1rem",
        borderRadius: "5px",
      }}
      onClick={(event: MouseEvent) => {
        event.preventDefault();
        dispatch(setModalPostState(postData!));
        dispatch(setPostModalOpen(true));
      }}
    >
      <img
        src={userPost.postImg.length !== 0 ? userPost.postImg[0].path! : ""}
        alt="challengeImg"
        style={{
          width: "13.5rem",
          height: "13.5rem",
        }}
      />
    </div>
  );
};

export default UserPostItem;
