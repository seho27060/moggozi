import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { postRead } from "../../lib/withTokenApi";
import { PostData } from "../../store/post";
import { setModalPostState, setPostModalOpen } from "../../store/postModal";
import { UserPostType } from "../../store/userPage";

const UserPostItem: React.FC<{
  userPost: UserPostType;
}> = ({ userPost }) => {
  const dispatch = useDispatch()
  let postData:PostData|null = null
  postRead(userPost.id).then((res)=>{
    postData = res
  }).catch((err)=>console.log("err post",userPost.id,err))
  return (
    <div
      style={{
        border: "solid 1px",
        width: "15rem",
        height: "15rem",
        margin: "2rem",
        borderRadius:"5px"
      }}
      onClick={(event: MouseEvent) => {
        event.preventDefault();
        dispatch(setModalPostState(postData!));
        dispatch(setPostModalOpen(true));
      }}
    >
      <img
        src={userPost.postImg!}
        alt="challengeImg"
        style={{
          width: "15rem",
          height: "12rem",
        }}
      />
      {userPost.title}
    </div>
  );
};

export default UserPostItem;
