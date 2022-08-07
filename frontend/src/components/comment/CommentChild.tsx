import { useSelector } from "react-redux";
import { Comment } from "../../store/comment";
import { RootState } from "../../store/store";
import CommentModifyBtn from "./CommentModifyBtn";

const CommentChild: React.FC<{ child: Comment, }> = ({ child }) => {
  const postId = useSelector((state:RootState)=>state.postModal.PostModalState!.id)
  return (
    <div>
      <p>{child.order}</p>
      <p>{child.writer?.nickname}</p>
      <CommentModifyBtn comment={child} postId = {postId}/>
      <div>
        <div>{child.text}</div>
        <div>{child.modifiedTime?.toString()}</div>
      </div>
    </div>
  );
};

export default CommentChild;
