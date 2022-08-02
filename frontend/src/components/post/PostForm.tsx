import { useRef } from "react";
import { Post } from "../../store/post";

// 만약 post 값이 널값이면 -> 생성폼이니 빈칸으로
// post가 값이 있다면 => 수정 폼이니 prop의 값으로 채워준다.

const PostForm: React.FC<{ post: Post | null }> = ({ post }) => {
  console.log(post);

  const titleInputRef = useRef<HTMLInputElement>(
    post?.title as unknown as HTMLInputElement
  );
  const contentInputRef = useRef<HTMLTextAreaElement>(
    post?.content as unknown as HTMLTextAreaElement
  );
  const memberIdInputRef = useRef<HTMLInputElement>(
    post?.member_id as unknown as HTMLInputElement
  );
  const postIdInputRef = useRef<HTMLInputElement>(
    post?.post_id as unknown as HTMLInputElement
  );
  const postImgInputRef = useRef<HTMLInputElement>(
    post?.post_img as unknown as HTMLInputElement
  );
  const stageIdInputRef = useRef<HTMLInputElement>(
    post?.stage_id as unknown as HTMLInputElement
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
