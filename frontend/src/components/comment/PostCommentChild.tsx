import { Comment } from "../../store/comment";

const PostCommentChild: React.FC<{ child: Comment }> = ({ child }) => {
  return (
    <div>
      <p>{child.order}</p>
      <p>{child.writer?.nickname}</p>
      <div>
        <div>{child.text}</div>
        <div>{child.modifiedTime?.toString()}</div>
      </div>
    </div>
  );
};

export default PostCommentChild;
