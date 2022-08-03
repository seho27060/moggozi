import { Comment } from "../../store/comment";

const PostCommentChild: React.FC<{ child: Comment }> = ({ child }) => {
  return (
    <div>
      <p>{child.writer?.nickname}</p>
      <p>
        <div>{child.text}</div>
        <div>{child.createdDate?.toString()}</div>
      </p>
    </div>
  );
};

export default PostCommentChild;
