import { useRef } from "react";
import { PostState } from "../../store/post";

// 생성폼 -> <PostForm post = {null}/>
// 수정폼 -> <PostForm post = {수정할려는 포스트 데이터}/>

const PostForm: React.FC<{ post: PostState | null }> = ({ post }) => {
  console.log(post);

  const titleInputRef = useRef<HTMLInputElement>(
    post?.title as unknown as HTMLInputElement
  );
  const contentInputRef = useRef<HTMLTextAreaElement>(
    post?.content as unknown as HTMLTextAreaElement
  );
  const memberIdInputRef = useRef<HTMLInputElement>(
    post?.memberId as unknown as HTMLInputElement
  );
  const postIdInputRef = useRef<HTMLInputElement>(
    post?.postId as unknown as HTMLInputElement
  );
  const postImgInputRef = useRef<HTMLInputElement>(
    post?.postImg as unknown as HTMLInputElement
  );
  const stageIdInputRef = useRef<HTMLInputElement>(
    post?.stageId as unknown as HTMLInputElement
  );

  if (post === null) {
    console.log("post create");
  } else {
    console.log("post update");
  }

  return(<div>

  </div>)
};
export default PostForm;
