import { Comment } from "../../store/comment";

const PostCommentChild: React.FC<{ child: Comment }> = ({ child }) => {
  return (
    <div>
      <p>{child.order}</p>
      <p>{child.writer?.nickname}</p>
      <p>
        <div>{child.text}</div>
        <div>{child.modifiedTime?.toString()}</div>
      </p>
    </div>
  );
};

export default PostCommentChild;
