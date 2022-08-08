import { MouseEvent, useRef } from "react";
import {
  PostUpdateSend,
  setPostUpdateFormState,
  setModalPostState,
} from "../../store/postModal";
import { postModify, PostData } from "../../store/post";
import { useDispatch, useSelector } from "react-redux";
import { postUpdate } from "../../lib/withTokenApi";
import { RootState } from "../../store/store";
// 생성폼 -> <PostUpdateForm post = {null}/>
// 수정폼 -> <PostForm post = {수정할려는 포스트 데이터}/>

const PostUpdateForm: React.FC<{}> = () => {
  const { postModalState: PostModalState } = useSelector((state: RootState) => state.postModal);
  console.log(PostModalState);

  const dispatch = useDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const postImgInputRef = useRef<HTMLInputElement>(null);

  const postingUpdateHandler = (event: MouseEvent) => {
    event.preventDefault();
    const PostUpdateData: PostUpdateSend = {
      postId: PostModalState!.id!,
      title: titleInputRef.current!.value,
      content: contentInputRef.current!.value,
      postImg: postImgInputRef.current!.value,
    };
    postUpdate(PostUpdateData)
      .then((res) => {
        console.log("post 수정완료", res);
        dispatch(postModify(res));
        dispatch(setPostUpdateFormState(false));
        const modifiedModalPost: PostData = {
          id: PostModalState!.id!,
          title: titleInputRef.current!.value,
          content: contentInputRef.current!.value,
          postImg: postImgInputRef.current!.value,
          createdTime: PostModalState!.createdTime,
          modifiedTime: PostModalState!.modifiedTime,
          writer: PostModalState!.writer,
          liked: PostModalState!.liked,
          likeNum: PostModalState!.likeNum,
        };
        dispatch(setModalPostState(modifiedModalPost));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div>
      <form>
        <div>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            ref={titleInputRef}
            defaultValue={PostModalState!.title!}
          />
        </div>
        <div>
          <label htmlFor="img">사진첨부</label>
          <input
            type="text"
            id="img"
            ref={postImgInputRef}
            defaultValue={PostModalState!.postImg!}
          />
        </div>
        {/* 사진 첨부 일단 text로 만듦 */}
        <div>
          <label htmlFor="content">포스팅 작성</label>
          <textarea
            rows={5}
            id="content"
            ref={contentInputRef}
            defaultValue={PostModalState!.content!}
          />
        </div>
        <button onClick={postingUpdateHandler}>등록하기</button>
      </form>
    </div>
  );
};
export default PostUpdateForm;
